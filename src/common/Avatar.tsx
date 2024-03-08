
import * as React from "react";

function map(value, start1, stop1, start2, stop2) {
    return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

const getByteLength = (string: string): number => {
    return new TextEncoder().encode(string[0])[0];
};

const minCharByteValue: number = getByteLength("a");
const maxCharByteValue: number = getByteLength("z");

const minRange: number = minCharByteValue / maxCharByteValue;
const maxRange: number = 1;

const initials = (firstname: string, lastname: string) =>
    (firstname[0] + lastname[0]).toUpperCase();

const colorByUser = ({ firstName, lastName, email }: IUser): string => {
    const userValue =
        getByteLength(firstName[0].toLowerCase()) /
        getByteLength(lastName[0].toLowerCase());

    return `hsl(${map(userValue, minRange, maxRange, 0, 360)},50%,50%)`;
};

interface IUser {
    firstName: string;
    lastName: string;
    email: string;
}

interface IProps {
    user: IUser;
}

export const Avatar: React.FC<IProps> = ({
    user: { firstName, lastName, email }
}) => {
    return (
        <div
            className="avatar-initials"
            style={{ backgroundColor: colorByUser({ firstName, lastName, email }) }}
        >
            {initials(firstName, lastName)}
        </div>
    );
};