<template>
    <label :class="wrapClass" :for="'id_' + label">
        <input type="radio" :id="'id_' + label" class="radio__input" :value="label" v-model="_value">
        <span class="radio-wrap">
      <span class="radio__icon"></span>
    </span>
        <span class="radio__label">
        <slot></slot>
    </span>
    </label>
</template>

<script>
    export default {
        name: 'lc-radio',
        props: {
            value: {},
            label: {}
        },
        computed: {
            wrapClass () {
                return [
                    `radio`,
                    {
                        'selected': this.label === this._value
                    }
                ]
            },
            _value: {
                get () {
                    return this.value
                },
                set (val) {
                    this.$emit('input', val)
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../scss/var";

    .radio {
        position: relative;
        display: inline-block;
        -webkit-tap-highlight-color: transparent;
        .radio-wrap, .radio__label {
            float: left;
        }
        .radio-wrap {
            position: relative;
            display: inline-block;
            width: 25px;
            height: 25px;
        }
        .radio__input {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            z-index: 3;
            width: 100%;
            outline: none;
            opacity: 0;
        }
        .radio__icon {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 18px;
            height: 18px;
            transform: translate(-50%, -50%);
            border-radius: 100%;
            border: 1px solid #ccc;
            box-sizing: border-box;
            &:after {
                content: "";
                position: absolute;
                left: 50%;
                top: 50%;
                margin-left: -4px;
                margin-top: -4px;
                border-radius: 100%;
                transform: scale(0);
                transition: -webkit-transfrom .2s, transfrom .2s;
            }
        }
        .radio__label {
            margin-left: 6px;
            font-size: 16px;
            line-height: 25px;
        }
        &.selected {
            .radio__icon {
                border-color: #e4e4e4;
                background-color: #fff;
                &:after {
                    width: 8px;
                    height: 8px;
                    background-color: $primary;
                    transform: scale(1);
                }
            }
        }
    }
</style>
