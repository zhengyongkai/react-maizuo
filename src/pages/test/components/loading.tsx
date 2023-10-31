import LoadingIcon from '@/assets/img/loading.gif';

const Loading = () => {
    return (
        <>
            <div style={{ margin: '0 auto', textAlign: 'center' }}>
                <img style={{ height: 48 }} src={LoadingIcon}></img>
            </div>
        </>
    );
};
export default Loading;
