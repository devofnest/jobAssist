const AlertBanner = () => {
	return (
		<div
			role="alert"
			aria-live="assertive"
			className="top-2 left-1/2 md:fixed md:top-2 md:left-1/2 md:transform md:-translate-x-1/2 
			text-red-500 border border-red-500 bg-black 
			font-semibold text-sm md:text-base z-50 text-center w-full md:w-auto mb-4 md:mb-0 
			rounded-md px-4 py-2"
		>
			🚫 본 서비스는 상업적 목적이 아닌, 학습과 실습을 위한 개인 프로젝트입니다. <br />
			기술 학습을 위한 스터디 프로젝트로, 실제 서비스와 무관합니다.
		</div>
	);
}

export default AlertBanner;
