import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { RiInboxArchiveLine, RiHeart2Line, RiArrowRightCircleLine, RiEdit2Line } from 'react-icons/ri'
import styled from "styled-components"
import { RoundButton } from './buttons/round-button'
import { When } from './when'

const Aside = styled.aside`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;

    @media(min-width: 768px){
        background-color: var(--secondary-background);
        padding: 48px 0px;
        width: 20%;
        min-width: 320px;
    }

    &.expanded {
        background-color: var(--secondary-background);
        padding: 48px 0px;
        width: 100%;
    }
`

const Nav = styled.nav<{ isActive: boolean }>`
    font-family: Montserrat, sans-serif;
    font-weight: semi-bold;
    font-size: 24px;
    color: white;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    visibility: hidden;

    svg {
        margin-right: 8px;
    }

    padding: 24px 42px;
    background-color: ${(props) => props.isActive ? 'var(--secondary-purple)' : 'transparent'};
    cursor: pointer;

    &:hover {
        background-color: ${(props) => !props.isActive ? 'rgba(119, 71, 255, 0.1)' : ''};
    }

    &.expanded {
        visibility: visible;
    }

    @media(min-width: 768px){
        visibility: visible;
    }
`

export function AsideNav(){
    const [isExpanded, setIsExpanded] = useState(false)
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const handleNewFile = () => {
        // post to API para criar novo arquivo
        const slug = 'fkjdfkj'
        navigate(`/editor/${slug}`)
    }

    const handleNavigate = (path: string) => {
        setIsExpanded(false)
        navigate(path)
    }

    const handleExpand = () => {
        setIsExpanded(prev => !prev)
    }

    return(
        <Aside className={isExpanded ? 'expanded' : ''}>
            <Nav
                className={isExpanded ? 'expanded' : ''}
                onClick={() => handleNavigate('/')} 
                isActive={pathname === '/'}
            >
                <RiInboxArchiveLine />
                All files
            </Nav>
            <Nav
                className={isExpanded ? 'expanded' : ''}
                onClick={() => handleNavigate('/favorites')} 
                isActive={pathname === '/favorites'}
            >
                <RiHeart2Line />
                Favorites
            </Nav>
            <Nav
                className={isExpanded ? 'expanded' : ''}
                onClick={handleNewFile} 
                isActive={pathname.includes('editor')}
            >
                <RiEdit2Line />
                <When expr={pathname.includes('editor')}>
                    {pathname.split('/')[2]}
                </When>
                <When expr={!pathname.includes('editor')}>
                    New
                </When>
            </Nav>
            <RoundButton className="expand" onClick={handleExpand}>
                <RiArrowRightCircleLine />
            </RoundButton>
        </Aside>
    )
}
