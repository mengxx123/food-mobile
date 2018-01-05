<template>
    <transition name="toast">
        <div :class="toastClass" v-show="visible">
            <i :class="iconClasses"></i>
            <span class="toast__text" :style="textStyle">{{message}}</span>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'lc-toast',
        props: {
            position: {
                type: String,
                default: 'middle',
                validator (val) {
                    return ['top', 'middle', 'bottom'].indexOf(val) > -1
                }
            },
            iconClass: {
                type: String,
                default: ''
            },
            message: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                visible: false
            }
        },
        computed: {
            textStyle () {
                return {
                    padding: this.iconClass !== '' ? '0' : '10px'
                }
            },
            toastClass () {
                return [
                    'toast',
                    `${this.position}`
                ]
            },
            iconClasses () {
                return [
                    'toast__icon',
                    `${this.iconClass}`
                ]
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../scss/var";

    .toast {
        position: fixed;
        max-width: 80%;
        border-radius: 5px;
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        box-sizing: border-box;
        z-index: 1000;
        transition: opacity 0.3s linear;
        &.middle {
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
        &.top {
            left: 50%;
            top: 50px;
            transform: translate(-50%, 0);
        }
        &.bottom {
            left: 50%;
            bottom: 50px;
            transform: translate(-50%, 0);
        }
        .toast__icon {
            display: block;
        }
        .toast__text {
            display: block;
            font-size: 14px;
            text-align: center;
        }
    }
    .toast-enter,
    .toast-leave-active {
        opacity: 0;
    }
</style>
