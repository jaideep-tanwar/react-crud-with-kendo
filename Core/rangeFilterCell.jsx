import * as React from 'react';
import { NumericTextBox } from '@progress/kendo-react-inputs';
import { DatePicker } from "@progress/kendo-react-dateinputs";
import Index from "pages/users/index"

export default class RangeFilterCell extends React.Component {
    minTextBox;
    maxTextBox;
    minDate;
    maxDate;

   
    inRange = (current, { min, max }) => (min === null || current >= min) && (max === null || current <= max);

    onChange = (event) => {
       const date =  new Date(this.minTextBox.value);
      this.minDate =((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
       
        //     const date2 =  new Date(this.maxTextBox.value);
        //   const  maxdate =((date2.getMonth() > 8) ? (date2.getMonth() + 1) : ('0' + (date2.getMonth() + 1))) + '/' + ((date2.getDate() > 9) ? date2.getDate() : ('0' + date2.getDate())) + '/' + date2.getFullYear()
       
        
       this.props.onChange({
            value: this.minDate,
            operator: "gte",
            syntheticEvent: event.syntheticEvent
        });
    }
    onChangeTo = (event) => {
       const date =  new Date(this.maxTextBox.value);
     this.maxDate =((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
       
        //     const date2 =  new Date(this.maxTextBox.value);
        //   const  maxdate =((date2.getMonth() > 8) ? (date2.getMonth() + 1) : ('0' + (date2.getMonth() + 1))) + '/' + ((date2.getDate() > 9) ? date2.getDate() : ('0' + date2.getDate())) + '/' + date2.getFullYear()
       
       this.props.onChange({
            value: this.maxDate,
            operator: "lte",
            syntheticEvent: event.syntheticEvent
        });
    }

    onClearButtonClick = event => {
        event.preventDefault();
        this.props.onChange({
            value: null,
            operator: '',
            syntheticEvent: event
        });
    }

    render() {
        // const value = this.props.value || null;
        const value = new Date();
        return (
             <div>
                From:
                <span style={{ margin: '0 16px 0 2px' }}>
                <DatePicker defaultValue={value && value.min} ref={(date) => { this.minTextBox = date; }}
                        onChange={this.onChange}
                        className='focused-element'  defaultShow={true} />
                    {/* <NumericTextBox
                        width="70px"
                        value={value && value.min}
                        ref={(numeric) => { this.minTextBox = numeric; }}
                        onChange={this.onChange}
                        className='focused-element'
                    /> */}
                </span>
                To:
                <span style={{ margin: '0 2px 0 4px' }}>
                <DatePicker defaultValue={value && value.max} ref={(date) => { this.maxTextBox = date; }} 
                        onChange={this.onChangeTo}
                        className='focused-element'  defaultShow={true} />
                    {/* <NumericTextBox
                        width="70px"
                        value={value && value.max}
                        ref={(numeric) => { this.maxTextBox = numeric; }}
                        onChange={this.onChange}
                    /> */}
                </span>
                <button
                    className="k-button k-button-icon k-clear-button-visible"
                    title="Clear"
                    disabled={!value}
                    onClick={this.onClearButtonClick}
                >
                    <span className="k-icon k-i-filter-clear" />
                </button>
            </div>
            // <div>
            //     Min:
            //     <span style={{ margin: '0 16px 0 2px' }}>
            //         <NumericTextBox
            //             width="70px"
            //             value={value && value.min}
            //             ref={(numeric) => { this.minTextBox = numeric; }}
            //             onChange={this.onChange}
            //             className='focused-element'
            //         />
            //     </span>
            //     Max:
            //     <span style={{ margin: '0 2px 0 4px' }}>
            //         <NumericTextBox
            //             width="70px"
            //             value={value && value.max}
            //             ref={(numeric) => { this.maxTextBox = numeric; }}
            //             onChange={this.onChange}
            //         />
            //     </span>
            //     <button
            //         className="k-button k-button-icon k-clear-button-visible"
            //         title="Clear"
            //         disabled={!value}
            //         onClick={this.onClearButtonClick}
            //     >
            //         <span className="k-icon k-i-filter-clear" />
            //     </button>
            // </div>
           
        );
    }
}
