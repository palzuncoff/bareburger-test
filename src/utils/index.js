import moment from 'moment-timezone';
import { DAYS, DAYS_READABLE, CIRCLE, HOURS_CIRCLE, TIME_FORMAT } from '../constants';

moment.updateLocale("en", { week: {
        dow: 1,
        doy: 4
    }});

const tz = moment.tz.guess();

const offSet = tz => moment.tz(tz).utcOffset();

const localOffset = process.env.REACT_APP_TEST_TIME_ZONE ? offSet(process.env.REACT_APP_TEST_TIME_ZONE) : offSet(tz);

const splitTime = time => time.split(':');

const arrToMinutes = arrTime => +arrTime[1] + arrTime[0] * 60;

const getTimeObj = min => ({ h: min / 60 | 0, m: min % 60 | 0 });

const getRestTime = (duration, time) => {
    if (time < 0) return getTimeObj(duration + time);
    if (time > CIRCLE) return getTimeObj(time - CIRCLE);
    return getTimeObj(time)
}

const returnTimeString = time => time < TIME_FORMAT ? `0${time}` : `${time}`;

const getWeekDay = (num = 0) => DAYS[moment().weekday() + num];

const getEntries = obj => Object.entries(obj).sort((a, b) => {
    if (DAYS.indexOf(a[0]) <  DAYS.indexOf(b[0])) return -1;
    if (DAYS.indexOf(a[0]) >  DAYS.indexOf(b[0])) return 1;

    return 0
});

const getTime = day => day.find(time => (
    moment().isBefore(moment({ hour: splitTime(time.from)[0], minute: splitTime(time.from)[1] })))
);

const inRange = ({ from, to }) => (
    moment().isBetween(moment({
        hour: splitTime(from)[0],
        minute: splitTime(from)[1],
    }), moment({
        hour: splitTime(to)[0],
        minute: splitTime(to)[1]
    }))
);

function scheduleHoursRange(day) {
    if (!day) {

        return 'not working'
    }
    return day.reduce((acc, item, i, day) => {
        const from = day[0].from;
        const to = day[day.length - 1].to;
        acc = `${moment({
            hour: splitTime(from)[0],
            minute: splitTime(from)[1]
        }).format('hh:mm A')} - ${moment({
            hour:splitTime(to)[0],
            minute: splitTime(to)[1]
        }).format('hh:mm A')} `;

        return acc;
    }, '')
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
    if (h === 1) res.push(`${h} hour`);
    if (h > 1) res.push(`${h} hours`);
    if (m > 0 && h > 0) res.push('and');
    if (m > 0) res.push(`${m} min`);

    return res.join(' ');
}

export function convertSchedule(ISchedule, storeTz) {
    const diff = localOffset - offSet(storeTz);
    if (diff !== 0) {
        return DAYS.reduce((acc, day, index, days) => {
            const currentDay = ISchedule[day];
            if (currentDay) {
                const prevDay = days[index - 1] || 'sun';
                const nextDay = days[index + 1] || 'mon';
                currentDay.forEach(time => {
                    const from = splitTime(time.from);
                    const to = splitTime(time.to);
                    const minFrom = arrToMinutes(from) + diff;
                    const minTo = arrToMinutes(to) + diff;
                    const duration = arrToMinutes(to) - arrToMinutes(from);
                    const timeFromObj = getTimeObj(Math.abs(minFrom));
                    const timeToObj = getTimeObj(Math.abs(minTo));
                    if (minFrom < 0 && minTo < 0) {
                        const formatHF = returnTimeString(Math.abs(timeFromObj.h - HOURS_CIRCLE));
                        const formatMF = returnTimeString(timeFromObj.m);
                        const formatHT = returnTimeString(Math.abs(timeToObj.h - HOURS_CIRCLE));
                        const formatMT = returnTimeString(timeToObj.m);
                        const time = { from: `${formatHF}:${formatMF}`, to: `${formatHT}:${formatMT}`};

                        acc[prevDay] = Array.isArray(acc[prevDay]) ? [...acc[prevDay], time] : [time];

                    } else if (minTo === 0) {
                        const formatHF = returnTimeString(Math.abs(timeFromObj.h - HOURS_CIRCLE));
                        const formatMF = returnTimeString(timeFromObj.m);
                        const formatHT = '23';
                        const formatMT = '59';
                        const time = { from: `${formatHF}:${formatMF}`, to: `${formatHT}:${formatMT}`};

                        acc[prevDay] = Array.isArray(acc[prevDay]) ? [...acc[prevDay], time] : [time];

                    } else if (minFrom < 0 && minTo > 0) {
                        const formatHF = returnTimeString(Math.abs(timeFromObj.h - HOURS_CIRCLE));
                        const formatMF = returnTimeString(timeFromObj.m);
                        const formatHT = '23';
                        const formatMT = '59';
                        const time = { from: `${formatHF}:${formatMF}`, to: `${formatHT}:${formatMT}`};

                        acc[prevDay] = Array.isArray(acc[prevDay]) ? [...acc[prevDay], time] : [time];

                        const nextDayHF = '00';
                        const nextDayMF = '00';
                        const nextDayHT = returnTimeString(getRestTime(duration, minTo).h);
                        const nextDayMT = returnTimeString(getRestTime(duration, minTo).m);
                        const nextDayTime = { from: `${nextDayHF}:${nextDayMF}`, to: `${nextDayHT}:${nextDayMT}`};

                        acc[day] = Array.isArray(acc[day]) ? [...acc[day], nextDayTime] : [nextDayTime];

                    } else if (minFrom === CIRCLE) {
                        const nextDayHF = '00';
                        const nextDayMF = '00';
                        const nextDayHT = returnTimeString(getRestTime(duration, minTo).h);
                        const nextDayMT = returnTimeString(getRestTime(duration, minTo).m);
                        const nextDayTime = { from: `${nextDayHF}:${nextDayMF}`, to: `${nextDayHT}:${nextDayMT}`};

                        acc[nextDay] = Array.isArray(acc[nextDay]) ? [...acc[nextDay], nextDayTime] : [nextDayTime];

                    } else if (minTo > CIRCLE) {
                        const formatHF = returnTimeString(timeFromObj.h);
                        const formatMF = returnTimeString(timeFromObj.m);
                        const formatHT = '23';
                        const formatMT = '59';
                        const time = { from: `${formatHF}:${formatMF}`, to: `${formatHT}:${formatMT}`};

                        acc[day] = Array.isArray(acc[day]) ? [...acc[day], time] : [time];

                        const nextDayHF = '00';
                        const nextDayMF = '00';
                        const nextDayHT = returnTimeString(getRestTime(duration, minTo).h);
                        const nextDayMT = returnTimeString(getRestTime(duration, minTo).m);
                        const nextDayTime = { from: `${nextDayHF}:${nextDayMF}`, to: `${nextDayHT}:${nextDayMT}`};
                        acc[nextDay] = Array.isArray(acc[nextDay]) ? [...acc[nextDay], nextDayTime] : [nextDayTime];
                    } else {
                        const formatHF = returnTimeString(timeFromObj.h);
                        const formatMF = returnTimeString(timeFromObj.m);
                        const formatHT = returnTimeString(timeToObj.h);
                        const formatMT = returnTimeString(timeToObj.m);
                        const time = { from: `${formatHF}:${formatMF}`, to: `${formatHT}:${formatMT}`};

                        acc[day] = Array.isArray(acc[day]) ? [...acc[day], time] : [time];
                    }
                });

                return acc;
            }
            return acc;
        }, {});
    }
    return ISchedule;
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