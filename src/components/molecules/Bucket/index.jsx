import update from 'immutability-helper';
import { useDrop } from 'react-dnd';
import { useParams, useHistory } from 'react-router-dom';
import {
    useState,
    useRef,
    useCallback,
    forwardRef,
    useImperativeHandle,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box as MUIBox } from '@material-ui/core';
import { save, saveById } from '../../../redux/formList/formList.actions';
import { selectAllForms } from '../../../redux/formList/formList.selectors';
import DropElement from '../DropElement';

export const Bucket = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        save() {
            id
                ? dispatch(saveById(parseInt(id), droppedItems))
                .then(() => history.push('/'))
                : droppedItems.length
                ? dispatch(save(droppedItems))
                    .then(() => history.push('/'))
                : alert('You cannot save an empty form.');
        },
    }));
    const dispatch = useDispatch();
    const history = useHistory();
    const forms = useSelector(selectAllForms);
    const { id } = useParams();

    const form = forms.find((d) => d.id === parseInt(id));
    const [ droppedItems, setDroppedItems ] = useState(
        form ? form.droppedItems : [],
    );
    const idCount = useRef(0);
    const [ {
        canDrop,
        isOver,
    }, drop ] = useDrop(() => ({
        // The type (or types) to accept - strings or symbols
        accept : [ 'BOX' ],
        // Props to collect
        drop : (item, monitor) => {
            if (!monitor.didDrop()) {
                addItem(item);
            }
        },
        collect : (monitor) => ({
            isOver : monitor.isOver(),
            canDrop : monitor.canDrop(),
        }),
    }));
    const moveCard = useCallback(
        (dragIndex, hoverIndex) => {
            const dragCard = droppedItems[dragIndex];
            setDroppedItems(
                update(droppedItems, {
                    $splice : [
                        [ dragIndex, 1 ],
                        [ hoverIndex, 0, dragCard ],
                    ],
                }),
            );
        },
        [ droppedItems ],
    );

    const addItem = (item) => {
        const newId = idCount.current++;
        setDroppedItems((d) => [
            ...d,
            {
                ...item,
                id : newId,
                options : {
                    label : item.name.charAt(0)
                        .toUpperCase() + item.name.substr(1),
                    nameAttr : item.name + newId,
                    rows : 2,
                    columns : 3,
                    text : '',
                },
            },
        ]);
    };
    const deleteItem = (id) => {
        setDroppedItems(droppedItems.filter((d) => d.id !== id));
    };
    const setOptions = (index, options) => {
        const removed = [ ...droppedItems.filter((d, i) => i !== index) ];
        removed.splice(index, 0, {
            ...droppedItems[index],
            options,
        });
        setDroppedItems(removed);
    };
    const cloneItem = (id) => {
        setDroppedItems((d) => [
            ...d,
            {
                ...droppedItems.find((d) => d.id === id),
                id : idCount.current++,
            },
        ]);
    };
    const renderCard = (card, index) => (
        <DropElement
            key={card.id}
            index={index}
            id={card.id}
            text={card.name}
            name={card.name}
            moveCard={moveCard}
            items={droppedItems}
            cloneItem={cloneItem}
            deleteItem={deleteItem}
            options={droppedItems[index].options}
            setOptions={setOptions}
        />
    );
    return (
        <>
            <MUIBox
                role="Dustbin"
                ref={drop}
                style={{
                    borderBottom : isOver ? '2px solid #0b78fa' : 'none',
                    display : 'flex',
                    flexDirection : 'column',
                }}
            >
                {droppedItems.map((card, i) => renderCard(card, i))}
                {canDrop ? (
                    <div
                        style={{
                            margin : '0px auto',
                            display : 'flex',
                            justifyContent : 'center',
                            alignItems : 'center',
                            width : '80%',
                            height : '80%',
                            background : '#eee',
                            border : '2px solid lightgray',
                            borderRadius : '5px',
                            padding : '20px',
                        }}
                    >
                        Drop here
                    </div>
                ) : null}
            </MUIBox>
        </>
    );
});
