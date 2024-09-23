<template>
    <div class="content">
        <div class="navbar">
            <div @click="toThisWeek">
                <p>THIS WEEK</p>
                <div id="select-box" v-if="false"></div>
            </div>
            <div @click="toNextWeek">
                <p>NEXT WEEK</p>
                <div id="select-box" v-if="true"></div>
            </div>
            <div @click="toHwoleMonth">
                <p>WHOLE MONTH</p>
                <div id="select-box" v-if="false"></div>
            </div>
        </div>
        <div class="vertical-line"></div>
        <div class="main-body">
            <div v-for="(item, index) in bookingList" :key="index">
                <div class="title">
                    {{ converDate(item.date) }}
                </div>
                <ul v-for="(detail, index) in item.detalis" :key="index">
                    <li class="item-red">
                        <div class="detail" style="color: black;">
                            <span>{{ detail.time }}</span>
                            <strong>{{ detail.title }}</strong>
                        </div>
                    </li>
                </ul>
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
            roomId: null,
            bookingList: [],
        }
    },
    created() {
        const queryString = window.location.search;
        const params = new URLSearchParams(queryString);
        this.roomId = params.get('roomId') || 'A101';
        this.toDay = params.get('toDay') || '2019-09-28 08:00:00';

        this.$emit('roomId', this.roomId);
    },
    mounted() {
        this.getBookingNextWeekly()
    },
    methods: {
        getBookingNextWeekly() {

            const today = dayjs(this.toDay);
            const startNextWeek = today.endOf('week').add(1, 'day').set('hour', 7).set('minute', 0).set('second', 0);
            const endOfWeek = startNextWeek.endOf('week').add(1, 'day').add(7, 'hour');

            const bookings = bookingData.sort((a, b) => new Date(a.startTime) - new Date(b.startTime)).filter((booking) => {
                const bookingStartDate = dayjs(booking.startTime).add(7, 'hour');
                const bookingEndDate = dayjs(booking.endTime).add(7, 'hour');
                return booking.roomId == this.roomId &&
                    (bookingStartDate >= startNextWeek || startNextWeek <= bookingEndDate) &&
                    (endOfWeek >= bookingEndDate || endOfWeek >= bookingStartDate);
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
        },
        converDate(date) {
            const day = dayjs(date).add(7, 'hour');
            const splitDay = day.toString().split(' ')

            const dayCheck = dayjs(date).set('hour', 24);
            const toDayCheck = dayjs(this.toDay).set('hour', 24);

            let dayConvert = '';
            switch (dayCheck.diff(toDayCheck, 'day')) {
                case 0:
                    dayConvert = `ToDay (${splitDay[0]} ${splitDay[1]} ${splitDay[2]})`;
                    break;
                case 1:
                    dayConvert = `Tomorrow (${splitDay[0]} ${splitDay[1]} ${splitDay[2]})`;
                    break;
                case -1:
                    dayConvert = `Yesterday (${splitDay[0]} ${splitDay[1]} ${splitDay[2]})`;
                    break;
                default:
                    dayConvert = `${splitDay[0]} ${splitDay[1]} ${splitDay[2]}`;
            }
            return dayConvert;

        },
        toNextWeek() {
            this.$router.push({
                name: 'bookingNextWeek',
                query: { roomId: this.roomId, toDay: this.toDay }
            })
        },
        toThisWeek() {
            this.$router.push({
                name: 'bookingThisweek',
                query: { roomId: this.roomId, toDay: this.toDay }
            })
        },
        toHwoleMonth() {
            this.$router.push({
                name: 'bookingHwoleMonth',
                query: { roomId: this.roomId, toDay: this.toDay }
            })
        }

    }
}
</script>

<style scoped>
.content {
    display: flex;
    flex-direction: column;
    height: 100vh;
    z-index: 2;
}

.box-click {
    flex-grow: 1;
    height: auto;
    width: auto;
}

.vertical-line {
    position: absolute;
    width: 1px;
    height: 90vh;
    background-color: rgb(206, 205, 205);
    margin-top: 10vh;
    z-index: 1;
    margin-left: 6vw;
}

.navbar {
    display: flex;
    height: 10vh;
    background-color: #ebe9e6;
    width: 60vw - 6vw;
    box-shadow: inset -3px -5px 10px rgba(207, 205, 205, 0.5);
    align-items: end;
    padding-left: 6vw;
    z-index: 2;
    margin-bottom: 5vh;
    flex-shrink: 0;
}

.navbar div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
    font-size: 12px;
}

#select-box {
    height: 5px;
    width: 30px;
    background-color: #3d70aa;
    margin-left: 20px;
    margin-top: -5px;
}

.main-body {
    flex-grow: 1;
    height: auto;
    z-index: 2;
    overflow-y: auto;

}

ul {
    margin-left: 4.3vw;
}

li {
    padding-bottom: 30px;
}

.detail {
    display: flex;
    flex-direction: column;
}

.detail span {
    font-size: 13px;
}

.title {
    display: flex;
    align-items: center;
    font-size: 10px;
    color: rgb(106, 105, 105);
    height: 5vh;
    background-color: #ebe9e6;
    padding-left: 10%;
}

.item-red {
    color: red;
}

.item-green {
    color: green;
}

.item-blue {
    color: blue;
}

.navbar p {
    text-decoration: none;
}
</style>