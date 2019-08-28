import * as moment from 'moment';

export default interface IDay {
    value: moment.Moment;
    active: boolean;
    disabled: boolean;
    selected: boolean;
}