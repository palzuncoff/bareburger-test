import moment from 'moment';
import { DAYS, DAYS_READABLE } from '../constants';

moment.updateLocale("en", { week: {
        dow: 1,
        doy: 4
    }});

const splitTime = time => time.split(':');

const getWeekDay = (num = 0) => DAYS[moment().weekday() + num];

const getEntries = obj => Object.entries(obj).sort((a, b) => {
    if (DAYS.indexOf(a[0]) <  DAYS.indexOf(b[0])) return -1;
    if (DAYS.indexOf(a[0]) >  DAYS.indexOf(b[0])) return 1;

    return 0
});

const getTime = day => day.find(time => moment().isBefore(moment({ hour: splitTime(time.from)[0], minute: splitTime(time.from)[1] })));

function scheduleHoursRange(day) {
    if (!day) {

        return 'not working;'
    }
    return day.reduce((acc, item) => {
        const { from, to } = item;

        return acc.concat(`${moment({ hour: splitTime(from)[0], minute: splitTime(from)[1] }).format('LT')} - ${moment({ hour:splitTime(to)[0], minute: splitTime(to)[1] }).format('LT')}; `)
    }, '')
}

function inRange({ from, to }) {

    return moment().isBetween(moment({ hour: splitTime(from)[0], minute: splitTime(from)[1] }), moment({ hour: splitTime(to)[0], minute: splitTime(to)[1] }));
}

function getFirstWorkDay(ISchedule) {
    const entries = getEntries(ISchedule);
    const dayName = DAYS_READABLE[entries[0][0]];
    const time = splitTime(entries[0][1][0].from);

    return `${dayName} at ${moment({ hour:time[0], minute:time[1] }).format('LT')}`
}

function getTomorrowWorkHours(ISchedule) {
    const day = ISchedule[getWeekDay(1)];
    const time = splitTime(day[0].from);

    return moment({ hour: time[0], minute: time[1] }).format('LT');
}

function getNextThisWeekWorkDay(nexWorkDay) {
    const time = splitTime(nexWorkDay[0].from);

    return moment({ hour: time[0], minute: time[1] }).format('LT');
}

function nextWorkTime(time) {
    const from = splitTime(time.from);
    const a = moment();
    const b = moment({ hour:from[0], minute:from[1] });
    const mins = b.diff(a, 'minutes');
    const h = mins / 60 | 0;
    const m = mins % 60 | 0;
    const res = ['In'];
    if (h > 0) res.push(`${h} hour`);
    if (m > 0 && h > 0) res.push('end');
    if (m > 0) res.push(`${m} min`);

    return res.join(' ');
}

export function getHumanReadableSchedule(ISchedule) {
    const entries = getEntries(ISchedule);
    if (entries.length < 1) return null;
    return DAYS.reduce((acc, dayId, index) => {
        const day = ISchedule[dayId];
        if (index === 0) {
            acc.push(`${dayId.toUpperCase()} : ${scheduleHoursRange(day)}`);

            return acc;
        }
        const prevDay = ISchedule[DAYS[index - 1]];
        if (scheduleHoursRange(day) === scheduleHoursRange(prevDay)) {
            const lastResult = acc[acc.length - 1];
            const indexA = lastResult.indexOf(':');
            const indexB = lastResult.indexOf('-');
            let newString;
            if (indexB > 0 && indexB < indexA) {
                const subString = lastResult.slice(indexB + 1, 7);
                newString = lastResult.replace(subString, dayId.toUpperCase())
            } else {
                newString = lastResult.replace(' :', `-${dayId.toUpperCase()} :`)
            }
            acc.pop();
            acc.push(newString);

            return acc;
        }
        acc.push(`${dayId.toUpperCase()} : ${scheduleHoursRange(day)}`);

        return acc;
    }, [])
}

export function isInWorkingHours(ISchedule) {
    return ISchedule[getWeekDay()] && ISchedule[getWeekDay()].some(inRange);
}

export function getHumanReadableNextWorkingHours(ISchedule) {
    if (!isInWorkingHours(ISchedule)) {
        const restDays = () => {
            const dayIndex = moment().weekday();

            return DAYS.slice(dayIndex)
        };
        return restDays().reduce((acc, day, index, days) => {
            if (ISchedule[days[0]]) {
                const time = getTime(ISchedule[days[0]]);
                if (time) {
                    acc = nextWorkTime(time);

                    return acc;
                }
            }
            if (ISchedule[days[1]]) {
                acc = `Tomorrow at ${getTomorrowWorkHours(ISchedule)}`;

                return acc;
            }
            const nexWorkDay = days.slice(2).find(day => ISchedule[day]);
            if (nexWorkDay) {
                acc = `On ${DAYS_READABLE[nexWorkDay]} ay ${getNextThisWeekWorkDay(ISchedule[nexWorkDay])}`;

                return acc;
            }
            acc = `Next week on ${getFirstWorkDay(ISchedule)}`;

            return acc;
        }, '');
    }

    return '';
}