type TitleProps = {
    text1: string;
    text2: string;
}

export function Title(props: TitleProps) {
    console.log(props);
    return <h1>
            Я програмистик {props.text1} + {props.text2}
        </h1>;
}