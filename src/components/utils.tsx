import { Button, OverlayTrigger, Popover,Tooltip } from "react-bootstrap"
import React from 'react';
import clsx from 'clsx';

interface PopoverProps {
    content: React.ReactNode
}

export const OverlayPopover: React.FC<PopoverProps> = (props) => {
    return   <OverlayTrigger overlay={( <Popover>{ props.content }</Popover>)} placement="top" trigger="click">
                <Button size="sm">?</Button>
            </OverlayTrigger>
}

interface HelpTipProps {
    content: React.ReactNode
}

export const HelpTip: React.FC<HelpTipProps> = (props) => {
    return <OverlayTrigger overlay={( <Tooltip>{ props.content }</Tooltip>)} placement="top" trigger="click">
                <Button size="sm" className="mx-1">?</Button>
            </OverlayTrigger>
}


interface IconProps {
    name: string;
    type?: string;
    size?: '2xs' |  'xs' |  'sm' |  'lg' |  'xl' |  '2xl' |  '1x' |  '2x' |  '3x' |  '4x' |  '5x' |  '6x' |  '7x' |  '8x' |  '9x' |  '10x'
    className?: string;
}

export const Icon : React.FC<IconProps> = (props: IconProps) => {
    const type = props.type ?? 'fas';
    return <i className={ clsx(type, 'fa-' + props.name, props.className) }></i>
}
