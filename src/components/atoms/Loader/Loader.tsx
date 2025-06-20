import React, { memo } from "react";
import "./Loader.module.scss";

type LoaderProps = {
    size?: number; // Размер спиннера в пикселях
    color?: string; // Цвет спиннера
};

const Loader = memo(({ size = 40, color = "#007BFF" }: LoaderProps) => {
    const loaderStyle = {
        width: size,
        height: size,
        borderColor: `${color} transparent transparent transparent`,
    };

    return <div className="loader" style={loaderStyle}></div>;
});

export default Loader;
