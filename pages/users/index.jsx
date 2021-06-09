import React from 'react';
import { useState, useEffect } from 'react';
import { getter } from "@progress/kendo-react-common";
import { Link } from 'components/Link';
import { userService } from 'services/user.service';
import { parseISO, format } from 'date-fns'
import { Grid, GridColumn as Column, GridToolbar, } from '@progress/kendo-react-grid';
// import getSelectedState from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';
import data from '../../data/users.json'
import { process } from '@progress/kendo-data-query'
import { MyCommandCell } from "../../Core/command";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Input } from "@progress/kendo-react-inputs";
import dropdownFilterCell from "../../Core/dropdownFilterCell";
import RangeFilterCell from "Core/rangeFilterCell"

// const DATA_ITEM_KEY = "id";
// const SELECTED_FIELD = "selected";
// const idGetter = getter(DATA_ITEM_KEY);
export default Index;

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

function Index() {
    const [users, setUsers] = useState(null);
    debugger
    const [gridData, setGridData] = useState(data);
    const [dataState, setDataState] = useState({ skip: 0, take: 10 });
    const [editID, setEditID] = useState(1);
    const [selectedState, setSelectedState] = useState({});
    
    const lastSelectedIndexRef = React.useRef(0);

   
    
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
        // const data = gridData.slice();
        // const index = gridData.findIndex(d => d.id === e.dataItem.id);
        // data[index] = { ...data[index], [e.field]: e.value };
        // setGridData(data)
    }
    const dataInEdit = process(gridData, dataState).data;


    // function deleteUser(id) {
    //     setUsers(users.map(x => {
    //         if (x.id === id) { x.isDeleting = true; }
    //         return x;
    //     }));
    //     userService.delete(id).then(() => {
    //         setUsers(users => users.filter(x => x.id !== id));
    //     });
    // }
    // const closeEdit = (event) => {
    //     if (event.target === event.currentTarget) {
    //         //   setEditID(null);
    //     }
    // };
    const CommandCell = (props) => (
        <MyCommandCell
            {...props}
            edit
            remove

        />
    );
        
    const onSelectionChange = React.useCallback(
        (event) => {
            debugger
            let last = lastSelectedIndexRef.current;
            const updatedData = data.map(dataItem => {
                return {...dataItem};
            });
            // const search = obj => obj.dev === true;
            const current = data.findIndex(dataItem => dataItem.id === event.dataItem.id);

            if (!event.nativeEvent.shiftKey) {
                lastSelectedIndexRef.current = last = current;
            }

            if (!event.nativeEvent.ctrlKey) {
                updatedData.forEach(item => (item.selected = false));
            }
            const select = !event.dataItem.selected;
            for (let i = Math.min(last, current); i <= Math.max(last, current); i++) {
                debugger
                updatedData[i].selected = select;
            }

            setGridData(updatedData);
        },
        [data, setGridData]
    );

    const onHeaderSelectionChange = React.useCallback(
        (event) => {
            debugger
            const checked = event.syntheticEvent.target.checked;
            const updatedData = data.map(item=>{
                return {
                    ...item,
                    selected: checked
                };
            });

            setGridData(updatedData);
        },
        [data, setGridData]
    );
   

    return (
        <div>
            <h1>Users</h1>
            {/* <Link href="/users/add" className="btn btn-sm btn-success mb-2 float-right">Add User</Link> */}
            <Grid  data={dataInEdit && dataInEdit.map((item) => ({
                ...item
            }))}
           
                pageable
                filterable
                sortable
                onDataStateChange={handleDataStateChange}
                editField="inEdit"
                onRowClick={handleRowClick}
                onItemChange={handleItemChange}
                total={data.length}
                onScroll={false}
                selectedField={'selected'}
    
                onSelectionChange={onSelectionChange}
                onHeaderSelectionChange={onHeaderSelectionChange}
                {...dataState}>
                <GridToolbar>
                    <div>
                        <button
                            title="Add new"
                            className="k-button k-primary float-right"
                        >
                            <Link href="/users/add" >Add User</Link>
                        </button>
                    </div>
                </GridToolbar>
                <Column
                field={'selected'}
                width={50}
                title={' '}
                headerSelectionValue={
                    data.findIndex(dataItem => dataItem.selected === false) === -1
                }
            />
                <Column cell={CommandCell} width="101px" filterable={false} />
                <Column field="firstName" title="First Name" filterCell={CategoryFilterCellStatic} />
                <Column field="lastName"   title="Last Name"  />
                <Column field="title"  title="Title" />
                <Column field="email"  title="Email" />
                <Column field="dateCreated"  title="Unit Price"  cell={UnitsInStockCell}   width="500px"  filter="date"
        format="{0:d}"  filterCell={RangeFilterCell}    />
               
                <Column field="role"  title="Role"  filterCell={CategoryFilterCell} />
            </Grid>
            {/* <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '30%' }}>Email</th>
                        <th style={{ width: '30%' }}>Role</th>
                        <th style={{ width: '30%' }}>Created At</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user =>
                        <tr key={user.id}>
                              <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/users/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={user.isDeleting}>
                                    {user.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                            <td>{user.title} {user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td><time dateTime={user.dateCreated}> {format(new Date(user.dateCreated),'MM/dd/yyyy')}</time></td>
                          
                        </tr>
                    )}
                    {!users &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {users && !users.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Users To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table> */}
            <div>

            </div>
        </div>
    );
}