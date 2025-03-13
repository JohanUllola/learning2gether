export const useTimeAgo = () => {
    const units = [
      { max: 60000, value: 1000, unit: 'second' }, // 1 minuto
      { max: 2760000, value: 60000, unit: 'minute' }, // 46 minutos
      { max: 72000000, value: 3600000, unit: 'hour' }, // 20 horas
      { max: 518400000, value: 86400000, unit: 'day' }, // 6 días
      { max: 2419200000, value: 604800000, unit: 'week' }, // 4 semanas
      { max: 28512000000, value: 2592000000, unit: 'month' }, // 11 meses
      { max: Infinity, value: 31536000000, unit: 'year' }
    ];
  
    const rtf = new Intl.RelativeTimeFormat('es', {
      numeric: 'auto',
      style: 'short'
    });
  
    const timeAgo = (date) => {
      try {
        const parsedDate = date instanceof Date ? date : new Date(date);
        if (isNaN(parsedDate)) return '';
        
        const now = new Date();
        const elapsed = parsedDate - now;
        const absElapsed = Math.abs(elapsed);
  
        for (const { max, value, unit } of units) {
          if (absElapsed < max) {
            return rtf.format(Math.round(elapsed / value), unit);
          }
        }
        
        return parsedDate.toLocaleDateString('es-ES');
      } catch (error) {
        console.error('Error formatting date:', error);
        return '';
      }
    };
  
    return { timeAgo };
  };