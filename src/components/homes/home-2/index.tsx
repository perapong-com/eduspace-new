import MarqueeOne from "@/common/MarqueeOne";
import HeaderTwo from "@/layouts/headers/HeaderTwo";
import React from "react";
import HeroHomeTwo from "./HeroHomeTwo";
import TopCategoryHomeTwo from "./TopCategoryHomeTwo";
import CertificateHomeTwo from "./CertificateHomeTwo";
import FooterTwo from "@/layouts/footers/FooterTwo";

const HomeTwo = () => {
	return (
		<>
			<MarqueeOne />
			<HeaderTwo />
			<HeroHomeTwo />
			<TopCategoryHomeTwo />
			<MarqueeOne />
			<CertificateHomeTwo />
			<MarqueeOne />
			<FooterTwo />
		</>
	);
};

export default HomeTwo;
