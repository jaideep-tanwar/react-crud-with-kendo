import * as React from 'react';

import { DropDownList } from '@progress/kendo-react-dropdowns';

export default function dropdownFilterCell(data, defaultItem) {
    return class extends React.Component {
        render() {
            return (
                <div className="k-filtercell">
                    <DropDownList
                        data={data}
                        onChange={this.onChange}
                        value={this.props.value || defaultItem}
                        defaultItem={defaultItem}
                    />
                    <button
                        className="k-button k-button-icon k-clear-button-visible"
                        title="Clear"
                        disabled={!this.hasValue(this.props.value)}
                        onClick={this.onClearButtonClick}
                    >
                        <span className="k-icon k-i-filter-clear" />
                    </button>
                </div>
            );
        }

        hasValue = value => Boolean(value && value !== defaultItem);

        onChange = event => {
            const hasValue = this.hasValue(event.target.value);
            this.props.onChange({
                value: hasValue ? event.target.value : '',
                operator: hasValue ? 'eq' : '',
                syntheticEvent: event.syntheticEvent
            });
        }

        onClearButtonClick = event => {
            event.preventDefault();
            this.props.onChange({
                value: '',
                operator: '',
                syntheticEvent: event
            });
        }
    };
}
