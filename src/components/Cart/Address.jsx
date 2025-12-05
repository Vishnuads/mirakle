import React, { useContext, useEffect, useState } from "react";
import Validation from "@/Vallidations/Validation";
import Back from "../../assets/icons/arrow-bend-up-left.svg";
import { CartContext } from "@/context/CartContext";
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";


const Address = ({ onClose }) => {
    const { addAddress, editAddress, deleteAddress, loading, addressesUpdated } =
        useContext(CartContext);

    const [formData, setFormData] = useState({
        title: "",
        cname: "",
        number1: "",
        number2: "",
        door: "",
        street: "",
        area: "",
        city: "",
        state: "",
        pincode: "",
    });

    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

        // Clear only that field’s error
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    useEffect(() => {
        if (addressesUpdated) {
            setFormData({
                title: addressesUpdated.title,
                cname: addressesUpdated.cname,
                number1: addressesUpdated.number1,
                number2: addressesUpdated.number2,
                door: addressesUpdated.door,
                street: addressesUpdated.street,
                area: addressesUpdated.area,
                city: addressesUpdated.city,
                state: addressesUpdated.state,
                pincode: addressesUpdated.pincode,
            });
        } else {
            setFormData({
                title: "",
                cname: "",
                number1: "",
                number2: "",
                door: "",
                street: "",
                area: "",
                city: "",
                state: "",
                pincode: "",
            });
        }
    }, [addressesUpdated]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Run validation
        const validationErrors = Validation(formData);
        setErrors(validationErrors);

        // If any error exists, stop submit
        if (Object.keys(validationErrors).length > 0) return;

        if (addressesUpdated) {
            const updated = { ...addressesUpdated, ...formData };
            editAddress(updated);
            onClose();
            toast.success("Address Updated Successfully");
        } else {
            const res = await addAddress(formData);
            if (res.success) {
                toast.success("Address Added Successfully");
                onClose();
            }
            setFormData({
                title: "",
                cname: "",
                number1: "",
                number2: "",
                door: "",
                street: "",
                area: "",
                city: "",
                state: "",
                pincode: "",
            });
        }
    };

    return (
        <>
            <div
                className="bg-black/60 fixed inset-0 flex items-center justify-center p-3 z-50"
                onClick={onClose}
            >
                <form onSubmit={handleSubmit}>
                    <div
                        className="max-w-4xl bg-[#F6F6F6] py-3 px-4 md:rounded-lg rounded-none 
                 w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {" "}


                        <div className="flex items-center justify-between mb-4">
                            {/* Title */}
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                {addressesUpdated ? "Update Address" : "Add a new Address"}
                            </h1>

                            {/* Cancel / Close Button */}

                            <button
                                type="button"
                                onClick={onClose}
                                className="w-8 h-8 flex items-center justify-center 
             bg-[#56750A] hover:bg-[#7ca020] text-white rounded-full shadow-md 
             transition-transform duration-200 transform hover:rotate-12"
                            >
                                <AiOutlineClose size={20} />
                            </button>
                        </div>

                        <div className="my-2 flex items-center">
                            <label
                                htmlFor="title"
                                className="block text-sm text-gray-500 pr-3 "
                            >
                                Title
                            </label>
                            <input
                                name="title"
                                type="text"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Home, Work, ..."
                                className="bg-white  py-2 px-3 rounded-lg border border-gray-200 focus:outline-none focus:border-green-600 transition-colors"
                            />
                        </div>
                        {errors.title && (
                            <p className="text-red-400 mt-1 ps-1 text-sm">{errors.title}</p>
                        )}
                        <div className="grid md:grid-cols-3 gap-2 my-1">
                            <div className="mb-2">
                                <label
                                    htmlFor="cname"
                                    className="block text-sm text-gray-400 mb-1"
                                >
                                    Receiver's Name
                                </label>
                                <input
                                    name="cname"
                                    type="text"
                                    placeholder=""
                                    value={formData.cname}
                                    onChange={handleChange}
                                    className="bg-white w-full py-2 px-3 rounded-lg border border-gray-200 focus:outline-none focus:border-green-600 transition-colors"
                                />
                                {errors.cname && (
                                    <p className="text-red-400 mt-1 ps-1 text-sm">
                                        {errors.cname}
                                    </p>
                                )}
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="contact1"
                                    className="block text-sm text-gray-400 mb-1"
                                >
                                    Contact Number
                                </label>
                                <input
                                    name="number1"
                                    type="number"
                                    placeholder=""
                                    value={formData.number1}
                                    onChange={handleChange}
                                    className="bg-white w-full py-2 px-3 rounded-lg border border-gray-200 focus:outline-none focus:border-green-600 transition-colors"
                                />
                                {errors.number1 && (
                                    <p className="text-red-400 mt-1 ps-1 text-sm">
                                        {errors.number1}
                                    </p>
                                )}
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="contact2"
                                    className="block text-sm text-gray-400 mb-1"
                                >
                                    Alternative Number
                                </label>
                                <input
                                    name="number2"
                                    type="number"
                                    value={formData.number2}
                                    onChange={handleChange}
                                    placeholder=""
                                    className="bg-white w-full py-2 px-3 rounded-lg border border-gray-200 focus:outline-none focus:border-green-600 transition-colors"
                                />
                                {errors.number2 && (
                                    <p className="text-red-400 mt-1 ps-1 text-sm">
                                        {errors.number2}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className=" grid md:grid-cols-3 grid-cols-1 gap-2 my-1">
                            <div className="mb-2">
                                <label
                                    htmlFor="door"
                                    className="block text-sm text-gray-400 mb-1"
                                >
                                    Door no
                                </label>
                                <input
                                    name="door"
                                    type="text"
                                    placeholder=" "
                                    value={formData.door}
                                    onChange={handleChange}
                                    className="bg-white w-full py-2 px-3 rounded-lg border border-gray-200 focus:outline-none focus:border-green-600 transition-colors pr-12"
                                />
                                {errors.door && (
                                    <p className="text-red-400 mt-1 ps-1 text-sm">
                                        {errors.door}
                                    </p>
                                )}
                            </div>

                            <div className="mb-2">
                                <label
                                    htmlFor="street"
                                    className="block text-sm text-gray-400 mb-1"
                                >
                                    Street
                                </label>
                                <input
                                    name="street"
                                    type="text"
                                    placeholder=" "
                                    value={formData.street}
                                    onChange={handleChange}
                                    className="bg-white w-full py-2 px-3 rounded-lg border border-gray-200 focus:outline-none focus:border-green-600 transition-colors pr-12"
                                />
                                {errors.street && (
                                    <p className="text-red-400 mt-1 ps-1 text-sm">
                                        {errors.street}
                                    </p>
                                )}
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="area"
                                    className="block text-sm text-gray-400 mb-1"
                                >
                                    Area
                                </label>
                                <input
                                    name="area"
                                    type="text"
                                    placeholder=" "
                                    value={formData.area}
                                    onChange={handleChange}
                                    className="bg-white w-full py-2 px-3 rounded-lg border border-gray-200 focus:outline-none focus:border-green-600 transition-colors pr-12"
                                />
                                {errors.area && (
                                    <p className="text-red-400 mt-1 ps-1 text-sm">
                                        {errors.area}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-2 my-1">
                            <div className="mb-2">
                                <label
                                    htmlFor="city"
                                    className="block text-sm text-gray-400 mb-1"
                                >
                                    City
                                </label>
                                <input
                                    name="city"
                                    type="text"
                                    placeholder=" "
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="bg-white w-full py-2 px-3 rounded-lg border border-gray-200 focus:outline-none focus:border-green-600 transition-colors pr-12"
                                />
                                {errors.city && (
                                    <p className="text-red-400 mt-1 ps-1 text-sm">
                                        {errors.city}
                                    </p>
                                )}
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="state"
                                    className="block text-sm text-gray-400 mb-1"
                                >
                                    State
                                </label>
                                <input
                                    name="state"
                                    type="text"
                                    placeholder=" "
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="bg-white w-full py-2 px-3 rounded-lg border border-gray-200 focus:outline-none focus:border-green-600 transition-colors pr-12"
                                />
                                {errors.state && (
                                    <p className="text-red-400 mt-1 ps-1 text-sm">
                                        {errors.state}
                                    </p>
                                )}
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="pincode"
                                    className="block text-sm text-gray-400 mb-1"
                                >
                                    Pincode
                                </label>
                                <input
                                    name="pincode"
                                    type="number"
                                    placeholder=" "
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    className="bg-white w-full py-2 px-3 rounded-lg border border-gray-200 focus:outline-none focus:border-green-600 transition-colors pr-12"
                                />
                                {errors.pincode && (
                                    <p className="text-red-400 mt-1 ps-1 text-sm">
                                        {errors.pincode}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-2 ">
                            <button
                                onClick={onClose}
                                className="flex items-center justify-center border border-black py-2 px-3 bg-white rounded-3 my-2"
                            >
                                <p className="flex items-center gap-2">
                                    {" "}
                                    <img src={Back} alt="Icon" className="w-5 h-5" /> Back{" "}
                                </p>
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`flex items-center justify-center text-white py-2 px-3 rounded-3 my-2 
    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#56750A]"}
  `}
                            >
                                <p>
                                    {loading
                                        ?  <>
                                        <span className="loader-border h-4 w-4 border-2 border-white rounded-full animate-spin"></span>
                                        Savimg...
                                        </>
                                        : addressesUpdated
                                            ? "Update Address"
                                            : "Save Address"}
                                </p>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Address;
