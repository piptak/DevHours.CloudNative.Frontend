import moment from "moment"

export const formatDate = (date: Date): string => {
    return moment(date).format('YYYY-MM-DD hh:mm');
}