import moment from 'moment';
import { DAYS } from '../constants';

function scheduleHoursRange(day) {
    if (!day) {
        return 'not working'
    }
    const [{from, to}] = day;
    const arrFrom = from.split(':')
    const arrTo = to.split(':')
    return `${moment({ hour:arrFrom[0], minute:arrFrom[1] }).format('LT')} - ${moment({ hour:arrTo[0], minute:arrTo[1] }).format('LT')}`
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