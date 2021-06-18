import React from 'react';
import API_URL from '../../backend';

const ImageHelper = ({product}) => {

    const imageUrl = product ? `${API_URL}/product/photo/${product._id}`: "https://images.pexels.com/photos/7775641/pexels-photo-7775641.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500";
    return (
        <div className="rounded border border-success p-2">
            <img
                src={imageUrl}
                alt="photo"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
                className="mb-3 rounded"
            />
        </div>
    );
}

export default ImageHelper;
