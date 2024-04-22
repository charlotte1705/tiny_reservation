import { useEffect, useState } from "react";
import { UserType } from "../../../../backend/src/shared/types";
import { fetchCurrentUser } from "../api/api-client";
import { useForm } from "react-hook-form";

type Props = {
    currentUser: UserType;
};

export type BookingFormData = {
    firstName: string;
    lastName: string;
    email: string;
};

const Profile = ({ currentUser }: Props) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { register } = useForm<BookingFormData>();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await fetchCurrentUser();
                setUser(userData);
            } catch (error: Error) {
                setError(error.message); // Update error state with specific error message
            }
        };

        fetchUserData();
    }, []);

    if (error) {
        return <div>Error fetching user data: {error}</div>; // Display specific error message
    }

    if (!user) {
        return <div>Loading...</div>; // Display loading indicator
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">My Profile</h1>
            <div className="grid grid-cols-2 gap-6">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input
                        className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                        type="text"
                        readOnly
                        value={user.firstName} // Use user data directly instead of form default values
                    />
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input
                        className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                        type="text"
                        readOnly
                        value={user.lastName} // Use user data directly instead of form default values
                    />
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Email
                    <input
                        className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                        type="text"
                        readOnly
                        value={user.email} // Use user data directly instead of form default values
                    />
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Role
                    <input
                        className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
                        type="text"
                        readOnly
                        value={user.role} // Use user data directly instead of form default values
                    />
                </label>
            </div>
        </div>
    );
};

export default Profile;
