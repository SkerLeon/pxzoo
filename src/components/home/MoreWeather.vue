    <template>
        <div class="moreweather">
            <img
                src="@/assets/images/member/memicon/green_close.svg"
                alt="close"
                class="close"
                id="close"
                @click="hideMoreWeather"
            />
            <div class="moreweather_content"  v-for="weather in weather_list">
                <div class="moreweather_content_day">
                    <div class="weather">
                        <img :src="getWeatherUrl(weather.img)" alt="weather"/>
                    </div>
                    
                    <p class="pcInnerText">{{ weather.weekday }}</p>
                    <h3 class="pcSmTitle">{{ weather.temp }}°C</h3>
                </div>
            </div>
        </div>
    </template>
    <script>
    export default {
        data() {
        return {
            weather_list: [
                {
                    img: 'sunny',
                    weekday:'星期三',
                    temp:'24',
                },
                {
                    img: 'mostly_clear',
                    weekday:'星期四',
                    temp:'22',
                },
                {
                    img: 'cloudy',
                    weekday:'星期五',
                    temp:'20',
                },
                {
                    img: 'dark_clouds',
                    weekday:'星期六',
                    temp:'20',
                },
                {
                    img: 'storm',
                    weekday:'星期日',
                    temp:'17',
                },
                {
                    img: 'rain',
                    weekday:'星期一',
                    temp:'19',
                },
            ],
            show: true,
        };
        },
        methods: {
            getWeatherUrl(paths) {
                return new URL(`../../assets/images/home/home_weather_${paths}.svg`, import.meta.url).href
            },//改網址

            hideMoreWeather() {
                this.$emit("close-moreweather");
            },
        },
    };
    </script>