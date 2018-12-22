import moment from 'moment';
import { DAYS, DAYS_READABLE } from '../constants';

function scheduleHoursRange(day) {
    if (!day) {
        return 'not working'
    }
    const [{from, to}] = day;
    const arrFrom = from.split(':')
    const arrTo = to.split(':')
    return `${moment({ hour:arrFrom[0], minute:arrFrom[1] }).format('LT')} - ${moment({ hour:arrTo[0], minute:arrTo[1] }).format('LT')}`
}

function inRange({ from, to }) {
    const arrFrom = from.split(':')
    const arrTo = to.split(':')
    return moment().isBetween(moment({ hour:arrFrom[0], minute:arrFrom[1] }), moment({ hour:arrTo[0], minute:arrTo[1] }));
}

function getFirstWorkDay(ISchedule) {
    const entries = Object.entries(ISchedule);
    const dayName = DAYS_READABLE[entries[0][0]]
    const time = entries[0][1][0].from.split(':')
    return `${dayName} at ${moment({ hour:time[0], minute:time[1] }).format('LT')}`
}

export function getHumanReadableSchedule(ISchedule) {
    const entries = Object.entries(ISchedule)
    if (entries.length < 1) return null;
    return DAYS.reduce((acc, dayId, index) => {
        const day = ISchedule[dayId]
        if (index === 0) {
            acc.push(`${dayId.toUpperCase()} : ${scheduleHoursRange(day)}`)
            return acc;
        }
        const prevDay = ISchedule[DAYS[index - 1]]
        if (scheduleHoursRange(day) === scheduleHoursRange(prevDay)) {
            const lastResult = acc[acc.length - 1]
            const indexA = lastResult.indexOf(':');
            const indexB = lastResult.indexOf('-')
            let newString;
            if (indexB > 0 && indexB < indexA) {
                const subString = lastResult.slice(indexB + 1, 3)
                newString = lastResult.replace(subString, dayId.toUpperCase())
            } else {
                newString = lastResult.replace(' :', `-${dayId.toUpperCase()} :`)
            }
            acc.pop()
            acc.push(newString)
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
            const dayIndex = moment().day() - 1
            return DAYS.slice(dayIndex)
        };
        const result = restDays().reduce((acc, day, index, days) => {
            if (ISchedule[day]) {
                acc.push(ISchedule[day])
                return acc;
            }
            const nextWorkDay = days.find(day => !!ISchedule[day])
            if (nextWorkDay) {
                return acc;
            }
            acc = `Next week on ${getFirstWorkDay(ISchedule)}`
            return acc;
        }, '');

        return result;
    }

    return '';
}