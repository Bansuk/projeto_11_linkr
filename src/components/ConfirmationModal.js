import Modal from "react-modal";

export default function ConfirmationModal({
    closeModal,
    modalIsOpen,
    loading,
    delPost,
    sharePost,
    modalType,
}) {
    return (
        <Modal
            onRequestClose={closeModal}
            isOpen={modalIsOpen}
            className="Modal"
        >
            {loading ? (
                <h2>
                    {modalType === "delete" ? "Excluindo..." : "Re-posting..."}
                </h2>
            ) : (
                <>
                    <h2>
                        {modalType === "delete"
                            ? "Tem certeza que deseja excluir essa publicação?"
                            : "Você gostaria de repostar este link?"}
                    </h2>
                    <div className="modal-buttons">
                        <button onClick={closeModal}>
                            {modalType === "delete"
                                ? "Não, voltar"
                                : "Não, cancelar"}
                        </button>
                        <button
                            onClick={
                                modalType === "delete" ? delPost : sharePost
                            }
                        >
                            {modalType === "delete"
                                ? "Sim, excluir"
                                : "Sim, compartilhar!"}
                        </button>
                    </div>
                </>
            )}
        </Modal>
    );
}
