import * as React from "react";
import { Link } from 'components/Link';
import { useState, useEffect } from 'react';
import { userService } from 'services/user.service';
import { useRouter } from 'next/router'

export const MyCommandCell = (props) => {
    const router = useRouter()
    const { dataItem } = props;
    const [users, setUsers] = useState(dataItem);

    useEffect(() => {
        userService.getAll().then(x => setUsers(x));
    }, []);

    function deleteUser(id) {
        setUsers(users.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        userService.delete(id).then(() => {
            setUsers(users => users.filter(x => x.id !== id));
        });
    }

    return (
        <td className="k-command-cell" >
            <button
                className="k-primary k-button k-grid-edit-command"
            >
                <Link href={`${router.pathname}/edit/${dataItem.id}`} className=""> <span className="k-icon k-i-edit"></span></Link>
            </button>
            <button
                className="k-button k-grid-remove-command "
                onClick={() =>
                    confirm("Confirm deleting: " + dataItem.title) &&
                    deleteUser(dataItem.id)
                } 
            >     
                <span className="k-icon k-i-delete"></span>
            </button>
        </td>
    );
};