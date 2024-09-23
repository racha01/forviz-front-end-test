<template>
    <div class="content">
        <div class="navbar">
            <div>
                <p>THIS WEEK</p>
                <div id="select-box" v-if="true"></div>
            </div>
            <div>
                <p>NEXT WEEK</p>
                <div id="select-box" v-if="isSelect"></div>
            </div>
            <div>
                <p>WHOLE MONTH</p>
                <div id="select-box" v-if="isSelect"></div>
            </div>
        </div>
        <div class="vertical-line"></div>
        <div class="main-body">
            <div class="title">
                Today (Mon 28 Sep)
            </div>
            <ul>
                <li class="item-red">
                    <div class="detail" style="color: black;">
                        <span>13:00-14:00</span>
                        <strong>Lunch Whit Petr</strong>
                    </div>
                </li>
                <li class="item-green">
                    <div class="detail" style="color: black;">
                        <span>15:00-16:00</span>
                        <strong>Sales Weekly Meeting</strong>
                    </div>
                </li>
                <li class="item-blue">
                    <div class="detail" style="color: black;">
                        <span>16:00-18:00</span>
                        <strong>Anastasai Website Warroom</strong>
                    </div>
                </li>
            </ul>
            <div class="title">
                Tomorrow (Tur 29 Sep)
            </div>
            <ul>
                <li class="item-red">
                    <div class="detail" style="color: black;">
                        <span>13:00-14:00</span>
                        <strong>One-on-one Session</strong>
                    </div>
                </li>
                <li class="item-green">
                    <div class="detail" style="color: black;">
                        <span>16:00-18:00</span>
                        <strong>UGC Sprint Planing</strong>
                    </div>
                </li>
            </ul>
            <div class="title">
                Tomorrow (Tur 29 Sep)
            </div>
            <ul>
                <li class="item-red">
                    <div class="detail" style="color: black;">
                        <span>13:00-14:00</span>
                        <strong>One-on-one Session</strong>
                    </div>
                </li>
                <li class="item-green">
                    <div class="detail" style="color: black;">
                        <span>16:00-18:00</span>
                        <strong>UGC Sprint Planing</strong>
                    </div>
                </li>
            </ul>
            <div class="title">
                Tomorrow (Tur 29 Sep)
            </div>
            <ul>
                <li class="item-red">
                    <div class="detail" style="color: black;">
                        <span>13:00-14:00</span>
                        <strong>One-on-one Session</strong>
                    </div>
                </li>
                <li class="item-green">
                    <div class="detail" style="color: black;">
                        <span>16:00-18:00</span>
                        <strong>UGC Sprint Planing</strong>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.content {
    display: flex;
    flex-direction: column;
    height: 100vh;
    z-index: 2;
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
</style>