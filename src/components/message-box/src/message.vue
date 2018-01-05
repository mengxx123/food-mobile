<template>
    <transition name="fade-in">
        <div class="message-wrap" v-if="visible">
            <div :class="boxClass">
                <div class="message-hd">
                    <div class="message-title">{{title}}</div>
                </div>
                <div class="message-bd retainbb">
                    <div class="message-content">{{message}}</div>
                </div>
                <div class="message-ft">
                    <button class="message-confirm retainbr" @click="handleConfirm">{{ confirmText }}</button>
                    <button v-if="type !== 'alert'" class="message-cancel" @click="handleCancel">{{ cancelText }}
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'lc-message-box',
        props: {
            type: {
                type: String,
                default: 'alert',
                validator (val) {
                    return ['alert', 'confirm'].indexOf(val) > -1
                }
            },
            visible: {
                type: Boolean,
                default: false
            },
            message: String,
            title: String,
            confirmText: {
                type: String,
                default: '确定'
            },
            confirm: {
                type: Function,
                default: function () {
                }
            },
            cancelText: {
                type: String,
                default: '取消'
            },
            cancel: {
                type: Function,
                default: function () {
                }
            }
        },
        computed: {
            boxClass () {
                return [
                    `message-box`,
                    `msg-${this.type}`
                ]
            }
        },
        methods: {
            handleCancel () {
                this.visible = false
                this.closeMask()
                this.cancel()
            },
            handleConfirm () {
                this.visible = false
                this.closeMask()
                this.confirm()
            },
            closeMask () {
                let masks = document.querySelectorAll('.message-mask')
                for (let i = 0; i < masks.length; i++) {
                    document.body.removeChild(masks[i])
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../scss/var";

    .message-wrap {
        position: absolute;
        .message-box {
            position: fixed;
            top: 50%;
            left: 50%;
            z-index: 2000;
            width: 85%;
            font-size: 16px;
            text-align: center;
            border-radius: 4px;
            background-color: #fff;
            transform: translate(-50%, -50%) scale(1);
            transform-origin: center;
            transition: transform .3s, opacity .3s;
            overflow: hidden;
            backface-visibility: hidden;
            .message-hd {
                padding: 15px 0 0;
            }
            .message-bd {
                padding: 10px 20px 15px;
            }
            .message-ft {
                display: flex;
            }
            .message-title {
                color: #333;
                font-weight: 700;
            }
            .message-content {
                color: #999;
                line-height: 36px;
            }
            .message-cancel,
            .message-confirm {
                flex: 1;
                border: 0;
                line-height: 40px;
                background-color: #fff;
                color: #26a2ff;
            }
            .message-cancel {
                color: #000;
                border-right: 1px solid #ddd;
            }
        }
    }

    .fade-in-enter,
    .fade-in-leave-active {
        .message-box {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
        }
    }
</style>
