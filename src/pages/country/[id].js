import { BsArrowLeft } from "react-icons/bs";
import "../../assets/CountryDetail.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";
import dynamic from "next/dynamic";

const CountryMap = dynamic(() => import("../../components/CountryMap"), { ssr: false });
const CountryDetail = ({ country }) => {

  const [showAll, setShowAll] = useState(false);
  const router = useRouter();
  const handleNavigateBack = () => {
    router.back();
  };
  const displayCount = showAll ? country.borders.length : 4;

  return (
    <>
      <Head>
        <title>Country Detail Page - {country?.name}</title>
        <meta
          name="description"
          content={`Details about ${country?.name} including population, region, and more.`}
        />
        <meta
          property="og:title"
          content={`Country Detail - ${country?.name}`}
        />
        <meta
          property="og:description"
          content={`Details about ${country?.name} including population, region, and more.`}
        />
        <meta property="og:image" content={country?.flag} />
        <meta
          name="twitter:title"
          content={`Country Detail - ${country?.name}`}
        />
        <meta
          name="twitter:description"
          content={`Details about ${country?.name} including population, region, and more.`}
        />
        <meta name="twitter:image" content={country?.flag} />
      </Head>

      <div className="lg:px-28 md:px-20 px-5 rounded-lg">
        {country ? (
          <div className="country-details">
            <div className="flex justify-end">
              <button
                onClick={handleNavigateBack}
                className="select-none flex items-center font-bold p-2 px-5 transition duration-150 rounded-lg text-white hover:text-white bg-black hover:bg-blue-700 dark:bg-blue-700 dark:hover:text-black dark:hover:bg-white"
              >
                <BsArrowLeft />
                <div className="pl-1">Back</div>
              </button>
            </div>
            <div className="country-details-body ">
              <div className="img-container">
                <img
                  src={country.flag || country.flags.png}
                  className="rounded-md object-contain select-none shadow-xl"
                  alt="Country Flag"
                />
              </div>
              <div className="country-details-content ml-4">
                <div className="country-details-name">
                  <h1 className="text-2xl font-bold">{country.name}</h1>
                </div>
                <div className="country-details-info">
                  <section className="mb-4">
                    <p>
                      Official Name:{" "}
                      <span className="font-semibold">{country.name}</span>
                    </p>
                    <p>
                      Population:{" "}
                      <span>{country.population.toLocaleString()}</span>
                    </p>
                    <p>
                      Region: <span>{country.region}</span>
                    </p>
                    <p>
                      Sub Region: <span>{country.subregion}</span>
                    </p>
                    <p>
                      Capital: <span>{country.capital}</span>
                    </p>
                    <p>
                      Calling Codes:{" "}
                      <span>
                        {country.callingCodes?.map((code, index) => (
                          <span key={index}>
                            +{code}
                            {index === country.callingCodes.length - 1
                              ? ""
                              : " , "}
                          </span>
                        ))}
                      </span>
                    </p>
                  </section>
                  <section>
                    <p className="flex items-center">
                      Currencies:{" "}
                      <span className="pl-2">
                        {country.currencies?.map((currency, index) => (
                          <span key={index}>
                            {currency.name} ({currency.symbol})
                            {index === country.currencies.length - 1
                              ? ""
                              : " , "}
                          </span>
                        ))}
                      </span>
                    </p>
                    <p>
                      Languages:{" "}
                      <span>
                        {country.languages?.map((language, index) => (
                          <span key={index}>
                            {language.name}
                            {index === country.languages.length - 1
                              ? ""
                              : " , "}
                          </span>
                        ))}
                      </span>
                    </p>
                  </section>
                </div>
                <div>
                  <p className="flex items-center flex-wrap gap-1">
                    Borders:
                    {country.borders
                      ?.slice(0, displayCount)
                      .map((border, index) => (
                        <span
                          key={index}
                          className="border-2 border-gray-500 hover:text-blue-500 rounded-md px-1"
                        >
                          <Link href="/country/[id]" as={`/country/${border}`}>
                            {border}
                          </Link>
                        </span>
                      ))}
                    {country.borders?.length > 4 && (
                      <button
                        className="text-blue-500 font-bold"
                        onClick={() => setShowAll(!showAll)}
                      >
                        {showAll ? "Show Less" : "Show More"}
                      </button>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <CountryMap country={country} />
          </div>
        ) : (
          <p className="text-red-500">Country not found.</p>
        )}
      </div>
    </>
  );
};

export default CountryDetail;

export async function getStaticPaths() {
  const response = await fetch("https://restcountries.com/v2/all");
  const countries = await response.json();

  const paths = countries.map((country) => ({
    params: { id: country.alpha3Code },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const response = await fetch(
    `https://restcountries.com/v2/alpha/${params.id}`
  );
  const country = await response.json();

  return { props: { country }, revalidate: 60 };
}
