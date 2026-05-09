import Modal from "./Modal";

function ConfirmSubmit({ setConfirmSubmit, isSubmitting, submitRecording }) {
  return (
    <Modal
      onClose={() => setConfirmSubmit(false)}
      className="w-full max-w-3/4 h-fit rounded-3xl border border-yellow-700/30  p-6 shadow-2xl shadow-black/40"
    >
      <div className="flex flex-col items-center text-center">
        <h1 className="text-xl font-semibold ">Are you sure?</h1>
        <p className="mt-2 text-sm text-stone-900">
          You are about to submit this recording.
        </p>
        <div className="mt-6 flex w-full gap-3">
          <button
            onClick={() => setConfirmSubmit(false)}
            className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 py-2.5 text-sm font-medium text-zinc-200 transition-all duration-200 hover:bg-zinc-700"
          >
            Cancel
          </button>
          <button
            disabled={isSubmitting}
            onClick={submitRecording}
            className="flex-1 rounded-xl bg-yellow-700 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-yellow-600 active:scale-[0.98]"
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmSubmit;
