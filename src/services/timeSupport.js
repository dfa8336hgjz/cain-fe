import { format } from 'date-fns';

export const formatDate = (date) => {
    const d = new Date(date);
    return format(d, 'MMMM do, yyyy');
}
