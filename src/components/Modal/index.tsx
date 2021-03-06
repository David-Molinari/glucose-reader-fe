import { useState, useEffect, Dispatch } from "react";
import './Modal.css';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { hexToRgbA } from '../../Utils';
import { IModal, RangeTuple } from '../../GlobalTypes';

type Props = {
    modal: IModal,
    setModal: Dispatch<IModal>,
    glucoseRangeTuples: RangeTuple[]
  }

function ModalComp(props: Props) {

    const toggle = (): void => props.setModal({...props.modal, open: false});

    const [color, setColor] = useState<string>("")

    // When the modal state variable is updated,
    // if open is set to true, add the appropriate
    // background color to the modal
    useEffect((): void => {
        if (props.modal.open == true) {
            let gl0pass: any = props.modal.data.glucoseLevelNum
            let gRs: RangeTuple[] = props.glucoseRangeTuples
            let gL0: number = gl0pass
            for (let i = 0; i < gRs.length; i++) {
                if (gL0 >= gRs[i][0] && gL0 <= gRs[i][1]) {
                    setColor(hexToRgbA(gRs[i][2], .15))
                }
            }
        }
    }, [props.modal])

    return (
        <Modal isOpen={props.modal.open} className="Modal">
            <ModalHeader 
                className="ModalHeader" 
                toggle={toggle}
                style={{color: color}}
            >
                Glucose Reading
            </ModalHeader>
            <ModalBody 
                className="ModalBody"
                style={{backgroundColor: color}}
            >
                <div className="ModalBodyInnerCont">
                    <div 
                        id="ModalBodyTopRow"
                        className="ModalRow"
                    >
                        <h3 className="ModalLabel">
                            Glucose Level:
                        </h3>
                        <h5 className="ModalEntry">
                            {props.modal.data.glucoseLevel}
                        </h5>
                    </div>
                    <div className="ModalRow">
                        <h3 className="ModalLabel">
                            Result Date:
                        </h3>
                        <h5 className="ModalEntry">
                            {props.modal.data.resultDate}
                        </h5>
                    </div>
                    <div className="ModalRow">
                        <h3 className="ModalLabel">
                            Source:
                        </h3>
                        <h5 className="ModalEntry">
                            {props.modal.data.source}
                        </h5>
                    </div>
                    <div className="ModalRow">
                        <h3 className="ModalLabel">
                            Result ID:
                        </h3>
                        <h5 
                            id="ResultIdEntry"
                            className="ModalEntry"
                        >
                            {props.modal.data.resultId}
                        </h5>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default ModalComp;