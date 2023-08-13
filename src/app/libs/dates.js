import { format } from 'date-fns';

export const formatDate = (date, formatDate = 'dd/MM/yyyy HH:mm:ss') => format(new Date(date), formatDate);