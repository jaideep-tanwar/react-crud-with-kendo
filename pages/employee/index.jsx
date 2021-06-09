import { useState, useEffect } from 'react';

import { Link } from 'components/Link';
import { userService } from 'services/user.service';
import { parseISO, format } from 'date-fns'
import { Grid, GridColumn as Column, GridToolbar,GridCellProps } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';
import data from '../../data/users.json'
import { process } from '@progress/kendo-data-query'
import { MyCommandCell } from "../../Core/command";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Input } from "@progress/kendo-react-inputs";
import dropdownFilterCell from "../../Core/dropdownFilterCell";
import RangeFilterCell from "Core/rangeFilterCell"

export default Indexs;

////dropdown
const categories = Array.from(
    new Set(data.map(p => p.role))
  );
  
  const categoriesStatic = Array.from(
    new Set(['foo', 'bar', 'baz', 'foo'])
  );
  
 
  const CategoryFilterCell = dropdownFilterCell(categories, "Select category");

// const CategoryFilterCell = dropdownFilterCell(categories, "Select category");
const CategoryFilterCellStatic = dropdownFilterCell(categoriesStatic, "Select category");
///////end dropdown


/////////////////date
const UnitsInStockCell = (props) => {
    const field = props.field || "";
    const total = props.dataItem.dateCreated;
    return (
        <>
      <time dateTime={total}> {format(new Date(total),'MM/dd/yyyy')}</time>
      
      </>
    );
  };

function Indexs() {
    const [users, setUsers] = useState(null);
    const [gridData, setGridData] = useState(data);
    const [dataState, setDataState] = useState({ skip: 0, take: 10 });
    const [editID, setEditID] = useState(1);


    const handleDataStateChange = (e) => {
        setDataState(e.data)
    }
    const handleRowClick = (e) => {
        setEditID(e.dataItem.id)
    }
    useEffect(() => {
        userService.getAll().then(x => {
            setUsers(x)
            setGridData(x)
        });
    }, []);
    const pageChange = (event) => {
        setPage(event.page);
    };
    const handleItemChange = (e) => {
    }
    const dataInEdit = process(gridData, dataState).data;

    const CommandCell = (props) => (
        <MyCommandCell
            {...props}
            edit
            remove

        />
    );
 
   

    return (
        <div>
            <h1>Employee</h1>
            <Grid width="100%" data={dataInEdit && dataInEdit.map((item) => {

                item.inEdit = item.id === editID
                return item
            })}
                pageable
                filterable
                sortable
                onDataStateChange={handleDataStateChange}
                editField="inEdit"
                onRowClick={handleRowClick}
                onItemChange={handleItemChange}
                total={data.length}
                {...dataState}>
                <GridToolbar>
                    <div>
                        <button
                            title="Add new"
                            className="k-button k-primary float-right"
                        >
                            <Link href="/employee/add" >Add User</Link>
                        </button>
                    </div>
                </GridToolbar>
                <Column cell={CommandCell} width="101px" filterable={false} />
                <Column field="firstName" title="First Name" filterCell={CategoryFilterCellStatic} />
                <Column field="lastName"   title="Last Name"  />
                <Column field="title"  title="Title" />
                <Column field="email"  title="Email" />
                <Column field="dateCreated"  title="Unit Price"  cell={UnitsInStockCell}   width="500px"  filter="date"
        format="{0:d}"  filterCell={RangeFilterCell}    />
               
                <Column field="role"  title="Role"  filterCell={CategoryFilterCell} />
            </Grid>          
            <div>

            </div>
        </div>
    );
}