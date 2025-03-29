import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface UserAvatarProps {
    src?: string;
    name?: string;
    fallbackChar?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
    src,
    name,
    fallbackChar,
    size = 'md',
    className = '',
}) => {
    // Calculate size class based on prop
    const sizeClass = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-32 h-32',
    }[size];

    // Get first character of name or use fallback
    const getFallbackChar = () => {
        if (fallbackChar) return fallbackChar;
        if (name && name.length > 0) return name[0];
        return 'U'; // Default fallback for User
    };

    return (
        <Avatar className={`${sizeClass} ${className}`}>
            <AvatarImage src={src || ""} alt={name || "User avatar"} />
            <AvatarFallback>
                {getFallbackChar()}
            </AvatarFallback>
        </Avatar>
    );
};

export default UserAvatar;