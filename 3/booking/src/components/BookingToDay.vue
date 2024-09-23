<template>
    <div class="content">
        <div class="title">
            <div class="title-box">{{ roomId }}</div>
        </div>
        <div class="body">
            <div>
                <span>
                    upcoming
                </span>
            </div>
            <div>
                <span style="font-size: 36px;">
                    {{ converDateDayOnly(bookingDoc.date) }}
                </span>
                <span style="font-size: 34px;">
                    {{ converDate(bookingDoc.date) }}
                </span>
            </div>
            <div>
                <div v-for="(item, index) in bookingDoc.detalis" :key="index" class="detail-box">
                    <span>{{ item.time }}</span>
                    <strong>{{ item.title }}</strong>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
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
const toDay = '2019-09-28 08:00:00';
export default {
    data() {
        return {
            toDay: '',
            roomId: '',
            bookingDoc: {}
        }
    },
    mounted() {
        this.getBookingToDay()
    },
    created() {
        const queryString = window.location.search;
        const params = new URLSearchParams(queryString);
        this.roomId = params.get('roomId') || 'A101';
        this.toDay = params.get('toDay') || '2019-09-28 08:00:00';

        this.$emit('roomId', this.roomId);
    },
    methods: {
        getBookingToDay() {
            const todayStart = dayjs(this.toDay).set('hour', 7);
            const todayEnd = dayjs(this.toDay).set('hour', 31).add(-1, 'second');

            const bookings = bookingData.sort((a, b) => new Date(a.startTime) - new Date(b.startTime)).filter((booking) => {
                const bookingStartDate = dayjs(booking.startTime).add(7, 'hour');
                return booking.roomId == this.roomId && bookingStartDate >= todayStart && bookingStartDate <= todayEnd;
            });

            if (bookings.length === 0) {
                const bookingDoc = {
                    roomId: this.roomId,
                    date: todayStart
                }
                this.bookingDoc = bookingDoc;
                return this.bookingDoc;
            }

            for (const booking of bookings) {
                const startTimeSplit = booking.startTime.split(' ');
                const endTimeSplit = booking.endTime.split(' ');
                if (this.bookingDoc.date == startTimeSplit[0]) {

                    const detalis = {
                        time: `${startTimeSplit[1]}-${endTimeSplit[1]}`,
                        title: booking.title
                    }
                    this.bookingDoc.detalis.push(detalis);
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
                    this.bookingDoc = bookingDoc;
                }
            }
        },
        converDateDayOnly(date) {
            const day = dayjs(date);
            const splitDay = day.add(7, 'hour').toString().split(',')
            return `${splitDay[0]}`;
        },
        converDate(date) {
            const day = dayjs(date);
            const splitDay = day.add(7, 'hour').toString().split(' ')
            return `${splitDay[1]} ${splitDay[2]}`;
        }
    }
}
</script>

<style scoped>
.content {
    display: flex;
    flex-direction: column;
    padding-left: 15%;
    height: 100vh;
}

.title-box {
    display: flex;
    height: 10vh;
    background-color: #5093df;
    padding-left: 10%;
    align-items: center;
    font-size: 40px;
    margin-bottom: 10vh;
}

.body {
    display: flex;
    flex-direction: column;
    height: 90vh;
    gap: 60px;
}

.body div {
    display: flex;
    flex-direction: column;
}

strong {
    font-size: 18px;
}

.detail-box {
    margin-bottom: 25px;
}
</style>