import moment from 'moment';
import { DAYS, DAYS_READABLE } from '../constants';

function scheduleHoursRange(day) {
    if (!day) {
        return 'not working'
    }
    return day.reduce((acc, item) => {
        const { from, to } = item;
        const arrFrom = from.split(':');
        const arrTo = to.split(':');
        return acc.concat(`${moment({ hour:arrFrom[0], minute:arrFrom[1] }).format('LT')} - ${moment({ hour:arrTo[0], minute:arrTo[1] }).format('LT')}`)
    }, '')
}

function inRange({ from, to }) {
    const arrFrom = from.split(':');
    const arrTo = to.split(':');
    return moment().isBetween(moment({ hour:arrFrom[0], minute:arrFrom[1] }), moment({ hour:arrTo[0], minute:arrTo[1] }));
}

function getFirstWorkDay(ISchedule) {
    const entries = Object.entries(ISchedule);
    const dayName = DAYS_READABLE[entries[0][0]];
    const time = entries[0][1][0].from.split(':');
    return `${dayName} at ${moment({ hour:time[0], minute:time[1] }).format('LT')}`
}

function getTomorrowWorkHours(ISchedule) {
    const day = ISchedule[DAYS[moment().day()]];
    const time = day[0].from.split(':');
    return moment({ hour: time[0], minute: time[1] }).format('LT');
}

function getNextThisWeekWorkDay(nexWorkDay) {
    const time = nexWorkDay[0].from.split(':');
    return moment({ hour: time[0], minute: time[1] }).format('LT');
}

const getTime = day => day.find(time => {
    const arrFrom = time.from.split(':');
    return moment().isBefore(moment({ hour:arrFrom[0], minute:arrFrom[1] }))
});

function nextWorkTime(time) {
    const from = time.from.split(':')
    const a = moment()
    const b = moment({ hour:from[0], minute:from[1] })
    const mins = b.diff(a, 'minutes')
    const h = mins / 60 | 0;
    const m = mins % 60 | 0;
    return `In ${h > 0 ? h : ''} ${h > 0 ? 'hour' : ''} ${m > 0 && h > 0 ? 'and' : ''} ${m > 0 ? m : ``} ${m > 0 ? 'min' : ''}`
}

export function getHumanReadableSchedule(ISchedule) {
    const entries = Object.entries(ISchedule);
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
                const subString = lastResult.slice(indexB + 1, 3);
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
    const currentDay = DAYS[moment().day() - 1];
    return ISchedule[currentDay] && ISchedule[currentDay].some(inRange);
}

export function getHumanReadableNextWorkingHours(ISchedule) {
    if (!isInWorkingHours(ISchedule)) {
        const restDays = () => {
            const dayIndex = moment().day() - 1;
            return DAYS.slice(dayIndex)
        };
        return restDays().reduce((acc, day, index, days) => {
            if (ISchedule[days[0]]) {
                const time = getTime(ISchedule[days[0]])
                if (time) {
                    acc = nextWorkTime(time)
                    return acc;
                }
            }
            if (ISchedule[days[1]]) {
                acc = `Tomorrow at ${getTomorrowWorkHours(ISchedule)}`;
                return acc;
            }
            const nexWorkDay = days.slice(2).find(day => ISchedule[day])
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