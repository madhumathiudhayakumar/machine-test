import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setAllCountries, setCountriesList, setLoading, setPageCount, setRegionList } from "../redux/homeSlice";
import Header from "../components/header";
import Slider from "../components/slide";
import Footer from "../components/footer";

const HomeScreen = () => {
	const dispatch = useDispatch()
	const { countriesList, loading, pageCount } = useSelector((state) => state.home)

	const handleLoadmoreClick = async () => {
		try {
			dispatch(setLoading({ buttonLoading: true }));
			await new Promise((resolve) => setTimeout(resolve, 1000));
			dispatch(setPageCount(parseInt(pageCount) + 10));
			dispatch(setLoading({ buttonLoading: false }));
		} catch (error) {
			dispatch(setLoading({ buttonLoading: false }));
			console.error("Load more error:", error);
		}
	};

	const getCountries = async () => {
		try {
			dispatch(setLoading({ initialLoading: true }))
			const response = await fetch('https://restcountries.com/v2/all?fields=name,region,flag', {
				method: 'GET',
			});

			if (!response.ok) {
				throw new Error('Failed to fetch countries list');
			}
			const data = await response.json();
			const uniqueRegions = Array.from(new Set(data.map(item => item.region).filter(Boolean)));
			dispatch(setAllCountries(data));
			dispatch(setCountriesList(data))
			dispatch(setRegionList(['All', ...uniqueRegions]))
			dispatch(setLoading({ initialLoading: false }))
		} catch (error) {
			console.error('Error:', error.message);
			dispatch(setLoading({ initialLoading: false }))
		}
	}

	useEffect(() => {
		getCountries()
	}, [])

	return (
		<div className="container my-5">
			<Header />
			{loading?.initialLoading ? <div class="spinner-border" role="status">
			</div> : <div>
				<Slider />
				<div className="row row-cols-1 row-cols-md-2 g-3">
					{countriesList?.slice(0, pageCount).map((country) => (
						<div className="col" key={country.name}>
							<div className="border rounded p-3 d-flex gap-3 align-items-start">
								<img
									src={country.flag}
									alt={country.name}
									style={{ width: "40px", height: "30px", objectFit: "cover" }}
								/>
								<div className="flex-grow-1">
									<h6 className="mb-1 fw-bold text-start">{country.name}</h6>
									<p className="mb-0 text-muted text-start">{country.region}</p>
								</div>
							</div>
						</div>
					))}
				</div>
				{countriesList?.length > 1 && countriesList?.length >= pageCount && (
					<div className="text-center mt-3">
						<button
							className="btn btn-dark"
							type="button"
							onClick={handleLoadmoreClick}>
							{loading?.buttonLoading ? "Loading..." : "Load More"}
						</button>
					</div>
				)}
				<div className="d-flex justify-content-center gap-3 mt-3">
					<Footer message={true} />
				</div>
			</div>
			}
		</div>
	)
}
export default HomeScreen