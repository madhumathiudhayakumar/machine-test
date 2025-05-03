import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../style/header.css"
import { setCountriesList, setIsWidthChange, setLoading, setPageCount } from "../redux/homeSlice";


const Header = () => {
	const dispatch = useDispatch()
	const { regionList,  allCountries, isWidthChange } = useSelector((state) => state.home)
	const [activeRegion, setActiveRegion] = useState("All");

	const handleRegionSelect = (region) => {
		if (region !== activeRegion) {
			setActiveRegion(region);
			dispatch(setLoading({ initialLoading: true }));
			const filtered = region === "All"
				? allCountries
				: allCountries.filter((el) => el.region === region);
			dispatch(setCountriesList(filtered));
			dispatch(setPageCount(10));
			setTimeout(() => {
				dispatch(setLoading({ initialLoading: false }));
			}, 1000);
		}
	};

	useEffect(() => {
		const handleSize = () => {
			if (window.innerWidth >= 950) {
				dispatch(setIsWidthChange(true));
			} else {
				dispatch(setIsWidthChange(false));
			}
		};
		handleSize();
		window.addEventListener("resize", handleSize);
		return () => {
			window.removeEventListener("resize", handleSize);
		};
	}, [dispatch]);

	return (
		<div>
			<div className="container-fluid px-4 pt-3">
				<div className="d-flex justify-content-between align-items-center">
					<h5 className="fw-bold mb-0">Countries</h5>
					{isWidthChange ?
						<ul className="nav flex-wrap">
							{regionList?.map((el, index) => (
								<li className="nav-item" key={index}>
									<button
										className={`nav-link border-0 ${activeRegion === el
											? "text-dark fw-bold border-bottom border-2 border-dark"
											: "text-secondary"
											}`}
										onClick={(e) => {
											e.preventDefault();
											handleRegionSelect(el);
										}}
										style={{
											backgroundColor: "transparent",
											pointerEvents: "auto",
										}}>
										{el}
									</button>
								</li>
							))}
						</ul> :
						<>
							<button
								className="btn btn-outline-secondary"
								type="button"
								data-bs-toggle="offcanvas"
								data-bs-target="#tabsOffcanvas"
								aria-controls="tabsOffcanvas">
								<i class="bi bi-list"></i>
							</button>
							<div
								className="offcanvas offcanvas-end"
								tabIndex="-1"
								id="tabsOffcanvas"
								aria-labelledby="tabsOffcanvasLabel">
								<div className="offcanvas-header">
									<h5 className="offcanvas-title" id="tabsOffcanvasLabel">
										Select Country
									</h5>
									<button
										type="button"
										className="btn-close"
										data-bs-dismiss="offcanvas"
										aria-label="Close"></button>
								</div>
								<div className="offcanvas-body">
									{regionList?.map((el, index) => (
										<button
											key={index}
											className={`btn w-100 text-start mb-2 ${activeRegion === el ? "selected-region" : "region-outline"
												}`}
											onClick={() => {
												handleRegionSelect(el);
												document.querySelector("#tabsOffcanvas .btn-close").click(); // Close the offcanvas
											}}>
											{el}
										</button>
									))}
								</div>
							</div>
						</>
					}
				</div>
				<div className="d-flex align-items-center justify-content-center my-4">
					<div style={{ height: "1px", backgroundColor: "#333", flex: 1, marginRight: "1rem", marginTop: "-20px" }}></div>
					<h3 className="fw-bold text-center m-0">WELCOME</h3>
					<div style={{ height: "1px", backgroundColor: "#333", flex: 1, marginLeft: "1rem", marginTop: "20px" }}></div>
				</div>
			</div>
		</div>
	)
}
export default Header