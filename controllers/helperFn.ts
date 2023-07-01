
interface BusySchedule {
  [email: string]: {
    busy: GEvent[];
  };
}

interface GEvent {
    start: string;
    end: string;
  }
  

interface HourlyBreakdown {
  email: string;
  availability: {
    [day: string]: string[];
  };
}
  

const MagicCalculation = (schedule: BusySchedule) => {

  const hourlyBreakdown: HourlyBreakdown[] = [];
  
  Object.entries(schedule).forEach(([email, { busy }]) => {
    const emailEntry: HourlyBreakdown = {
      email,
      availability: {
        Mon: [],
        Tue: [],
        Wed: [],
        Thu: [],
        Fri: [],
        Sat: [],
        Sun: [],
      },
    };
  
    busy.forEach((event) => {
      const start = new Date(event.start);
      const end = new Date(event.end);
  
      const duration = (end.getTime() - start.getTime()) / 1000; // duration in seconds
  
      for (let i = 0; i < duration / 3600; i++) {
        const hour = new Date(start.getTime() + i * 3600000).toLocaleString("en-US", {
          hour: "numeric",
          hour12: true,
        });
        const day = new Date(start.getTime() + i * 3600000).toLocaleString("en-US", {
          weekday: "short",
        });
  
        if (hour && day) {
          emailEntry.availability[day].push(hour);
        }
      }
    });
  
    hourlyBreakdown.push(emailEntry);
  });
  
  return hourlyBreakdown
}

export default MagicCalculation