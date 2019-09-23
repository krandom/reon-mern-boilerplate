import { useState, useEffect } from 'react';
import { connect} from 'react-redux';
import { sidebarActions } from '../../reducers/sidebar.reducer';

const Sidebar = ({ pages, transition, delSidebarPage }) => {
    const [ID] = useState(uuid());

    useEffect(() => {

        if (pages.length > 0) {
            $(`#${ID}overlay`).addClass('sidebar__overlay--block');
            setTimeout(() => {
                $(`#${ID}overlay`).css({ opacity: 1 });
            }, 10)

            $(`#${ID}`).css({ right: 0 });

        } else if (pages.length === 0) {
            $(`#${ID}overlay`).css({ opacity: 0 });
            setTimeout(() => {
                $(`#${ID}overlay`).removeClass('sidebar__overlay--block');
            }, 300);

            $(`#${ID}`).css({ right: -320 });
        }

    }, [pages]);

    // console.log('sidebar ID', props)

    return (
        <>
        <div className={`sidebar`} id={ID}>
            {pages.length > 0 && pages[pages.length-1]}
        </div>
        <div className='sidebar__overlay' id={`${ID}overlay`} onClick={() => { delSidebarPage(); }} />
        </>
    );
}

const mstp = s => ({
    pages: s.sidebar.pages,
    transition: s.sidebar.transition,
});

const mdtp = {
    delSidebarPage: sidebarActions.delSidebarPage,
};

export default connect(mstp, mdtp)(Sidebar);