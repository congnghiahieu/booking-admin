const CopiedText = ({ text, textHidden }) => {
    const onCopy = () => {
        navigator.clipboard.writeText(text);
    };

    return (
        <>
            {!textHidden ? <span className='copied'>{text}</span> : <></>}
            <button onClick={onCopy} style={{ marginLeft: '20px' }}>
                Copy text
            </button>
        </>
    );
};

export default CopiedText;
