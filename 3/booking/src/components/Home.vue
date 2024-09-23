<template>
    <div class="container">
        <div class="main-content">
            <BookingInfo :roomId="roomId" />
        </div>
        <div class="sub-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
// import Booking from './Booking.vue';
import BookingInfo from './BookingToDay.vue';
import BookingThisWeek from './BookingThisWeek.vue';
import dayjs from 'dayjs';
const bookingData = [
    {
        "id": 1,
        "roomId": "A101",
        "startTime": "2019-09-28 13:00:00",
        "endTime": "2019-09-28 14:00:00",
        "title": "Lunch with Petr"
    },
    {
        "id": 2,
        "roomId": "A101",
        "startTime": "2019-09-28 14:00:00",
        "endTime": "2019-09-28 15:00:00",
        "title": "Sales Weekly Meeting"
    },
    {
        "id": 3,
        "roomId": "A101",
        "startTime": "2019-09-28 16:00:00",
        "endTime": "2019-09-28 18:00:00",
        "title": "Anastasia Website Warroom"
    },
    {
        "id": 4,
        "roomId": "A101",
        "startTime": "2019-09-29 13:00:00",
        "endTime": "2019-09-29 14:00:00",
        "title": "One-on-One Session"
    },
    {
        "id": 5,
        "roomId": "A101",
        "startTime": "2019-09-29 16:00:00",
        "endTime": "2019-09-29 18:00:00",
        "title": "UGC Sprint Planning"
    },
    {
        "id": 6,
        "roomId": "A102",
        "startTime": "2019-09-30 09:00:00",
        "endTime": "2019-10-04 18:00:00",
        "title": "5-Day Design Sprint Workshop"
    },
    {
        "id": 7,
        "roomId": "Auditorium",
        "startTime": "2019-09-19 09:00:00",
        "endTime": "2019-09-23 19:00:00",
        "title": "Thai Tech Innovation 2019"
    },
    {
        "id": 8,
        "roomId": "A101",
        "startTime": "2019-09-28 10:00:00",
        "endTime": "2019-09-28 13:00:00",
        "title": "Raimonland project"
    },
    {
        "id": 9,
        "roomId": "A102",
        "startTime": "2019-09-30 18:00:00",
        "endTime": "2019-09-30 20:00:00",
        "title": "Management Meetinng"
    },
    {
        "id": 10,
        "roomId": "A101",
        "startTime": "2019-10-04 14:00:00",
        "endTime": "2019-10-06 11:00:00",
        "title": "3-day workshop Corgi costume"
    }
]

const toDay = '2019-09-28 14:00:00';

export default {
    data() {
        return {
            roomId: null,
            bookingList: []
        }
    },
    components: {
        BookingThisWeek,
        BookingInfo
    },
    created() {
        const queryString = window.location.search;
        const params = new URLSearchParams(queryString);
        this.roomId = params.get('roomId');

        this.$emit('roomId', this.roomId);
    },
    mounted() {
        this.getBookingForWeekly(),
            document.title = "Bookings - My Vue App";
        const meta = document.createElement('meta');
        meta.name = "description";
        meta.content = "View and manage your bookings easily.";
        document.head.appendChild(meta);
    },
    methods: {
        getBookingForWeekly() {

            const today = dayjs(toDay);
            const endOfWeek = today.endOf('week')

            const bookings = bookingData.filter((booking) => {
                const bookingStartDate = dayjs(booking.startTime);
                const bookingEndDate = dayjs(booking.endTime);
                return booking.roomId == this.roomId && (bookingStartDate >= today && endOfWeek <= bookingEndDate);
            });

            for (const booking of bookings) {
                const startTimeSplit = booking.startTime.split(' ');
                const endTimeSplit = booking.endTime.split(' ');
                if (this.bookingList.some(b => b.date == startTimeSplit[0])) {

                    const detalis = {
                        time: `${startTimeSplit[1]}-${endTimeSplit[1]}`,
                        title: booking.title
                    }

                    const index = this.bookingList.findIndex(b => b.date == startTimeSplit[0]);

                    this.bookingList[index].detalis.push(detalis);
                }
                else {
                    const bookingDoc = {
                        roomId: this.roomId,
                        date: startTimeSplit[0],
                        detalis: [{
                            time: `${startTimeSplit[1]}-${endTimeSplit[1]}`,
                            title: booking.title
                        }]
                    }
                    this.bookingList.push(bookingDoc)
                }
            }
        }
    }

}
</script>

<style></style>