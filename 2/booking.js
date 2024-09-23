const bookingData = [
  {
    id: 1,
    roomId: "A101",
    startTime: "2019-09-28 13:00:00",
    endTime: "2019-09-28 14:00:00",
    title: "Lunch with Petr",
  },
  {
    id: 2,
    roomId: "A101",
    startTime: "2019-09-28 14:00:00",
    endTime: "2019-09-28 15:00:00",
    title: "Sales Weekly Meeting",
  },
  {
    id: 3,
    roomId: "A101",
    startTime: "2019-09-28 16:00:00",
    endTime: "2019-09-28 18:00:00",
    title: "Anastasia Website Warroom",
  },
  {
    id: 4,
    roomId: "A101",
    startTime: "2019-09-29 13:00:00",
    endTime: "2019-09-29 14:00:00",
    title: "One-on-One Session",
  },
  {
    id: 5,
    roomId: "A101",
    startTime: "2019-09-29 16:00:00",
    endTime: "2019-09-29 18:00:00",
    title: "UGC Sprint Planning",
  },
  {
    id: 6,
    roomId: "A102",
    startTime: "2019-09-30 09:00:00",
    endTime: "2019-10-04 18:00:00",
    title: "5-Day Design Sprint Workshop",
  },
  {
    id: 7,
    roomId: "Auditorium",
    startTime: "2019-09-19 09:00:00",
    endTime: "2019-09-23 19:00:00",
    title: "Thai Tech Innovation 2019",
  },
  {
    id: 8,
    roomId: "A101",
    startTime: "2019-09-28 10:00:00",
    endTime: "2019-09-28 13:00:00",
    title: "Raimonland project",
  },
  {
    id: 9,
    roomId: "A102",
    startTime: "2019-09-30 18:00:00",
    endTime: "2019-09-30 20:00:00",
    title: "Management Meetinng",
  },
  {
    id: 10,
    roomId: "A101",
    startTime: "2019-10-04 14:00:00",
    endTime: "2019-10-06 11:00:00",
    title: "3-day workshop Corgi costume",
  },
];

const dayjs = require("dayjs");

const checkAvailability = (startTime, endTime) => {
  const rangestartTime = new Date(startTime);
  const rangeendTime = new Date(endTime);

  const filterBookings = bookingData.filter((booking) => {
    const bookingStartDate = new Date(booking.startTime);
    const bookingEndDate = new Date(booking.endTime);
    return (
      (bookingStartDate >= rangestartTime ||
        rangestartTime <= bookingEndDate) &&
      (rangeendTime >= bookingEndDate || rangeendTime >= bookingStartDate)
    );
  });

  if (filterBookings.length !== 0) {
    return true;
  } else {
    return false;
  }
};

console.log(checkAvailability("2019-10-06 10:00:00", "2019-10-08 11:00:00"));

const getBookingsForToday = (toDay) => {
  const todayStart = dayjs(toDay).set("hour", 7);
  const todayEnd = dayjs(toDay).set("hour", 31).add(-1, "second");

  const bookingToday = bookingData.filter((booking) => {
    const bookingStartDate = dayjs(booking.startTime);
    return bookingStartDate >= todayStart && bookingStartDate <= todayEnd;
  });

  return bookingToday;
};

console.log(getBookingsForToday("2019-09-28 00:00:00"));

const getBookingsForWeek = (toDay) => {
  const today = dayjs(toDay).add(7, "hour");
  const endOfWeek = today.endOf("week").add(7, "hour");

  console.log(JSON.stringify(today));
  console.log(JSON.stringify(endOfWeek));

  const bookings = bookingData.filter((booking) => {
    const bookingStartDate = dayjs(booking.startTime).add(7, "hour");
    const bookingEndDate = dayjs(booking.endTime).add(7, "hour");
    return (
      (bookingStartDate >= today || today <= bookingEndDate) &&
      (endOfWeek >= bookingEndDate || endOfWeek >= bookingStartDate)
    );
  });

  return bookings;
};

console.log(getBookingsForWeek("2019-09-28 00:00:00"));

const getBookingsForNextWeek = (toDay) => {
  const today = dayjs(toDay);
  const startNextWeek = today
    .endOf("week")
    .add(1, "day")
    .set("hour", 7)
    .set("minute", 0)
    .set("second", 0);
  const endOfWeek = startNextWeek.endOf("week").add(1, "day").add(7, "hour");

  const bookings = bookingData
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
    .filter((booking) => {
      const bookingStartDate = dayjs(booking.startTime).add(7, "hour");
      const bookingEndDate = dayjs(booking.endTime).add(7, "hour");
      return (
        (bookingStartDate >= startNextWeek ||
          startNextWeek <= bookingEndDate) &&
        (endOfWeek >= bookingEndDate || endOfWeek >= bookingStartDate)
      );
    });

    return bookings;
};

console.log(getBookingsForNextWeek("2019-09-28 00:00:00"));
