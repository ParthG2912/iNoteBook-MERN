import React, { useEffect, useState } from "react";

const UserDetail = () => {
    const [detail, setDetail] = useState({ name: "", email: "" });

    const getDetail = async () => {
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
            method: "GET",
            headers: {
                "content-type": "application/JSON",
                "auth-token": localStorage.getItem("token"),
            },
        });
        const json = await response.json();
        const { name, email } = json;
        setDetail({ name, email });
    };

    useEffect(() => {
        getDetail();
        // eslint-disable-next-line
    }, []);

    return (
        <fieldset disabled>
            <h2 className="my-3">Your Personal Details</h2>
            <div className="mb-3">
                <label for="name" className="form-label">
                    Name
                </label>
                <input type="text" id="name" name="name" className="form-control" placeholder={detail.name} />
            </div>
            <div className="mb-3">
                <label for="email" className="form-label">
                    Email
                </label>
                <input type="text" id="email" name="email" className="form-control" placeholder={detail.email} />
            </div>
        </fieldset>
    );
};

export default UserDetail;
