import { useState, useEffect } from 'react';
import MapView from './components/MapView';

interface LocationData {
    ip: string;
    success: boolean;
    continent: string;
    country: string;
    region: string;
    city: string;
    latitude: number;
    longitude: number;
    postal: number;
    timezone_gmt: string;
    isp: string;
}

function App() {
    const [location, setLocation] = useState<LocationData | null>(null);
    const [ip, setIp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchIPData = (queryIp?: string) => {
        setLoading(true);
        setError(null);
        setLocation(null);

        const url = queryIp
            ? `https://ipwhois.app/json/${queryIp}`
            : 'https://ipwhois.app/json/';

        fetch(url)
            .then((res) => res.json())
            .then((data: LocationData) => {
                if (data.success !== false) {
                    setLocation(data);
                } else {
                    setError('This IP was not found.');
                }
            })
            .catch(() => {
                setError('An error has occurred.');
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchIPData();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (ip.trim()) {
            fetchIPData(ip.trim());
        }
    };

    return (
        <main className="flex flex-col h-screen">
            <div className="flex flex-col items-center p-6 bg-[url('/images/pattern-bg-mobile.png')] md:bg-[url('/images/pattern-bg-desktop.png')] bg-cover h-[35%]">
                <h1 className="text-3xl font-bold text-white">IP Address Tracker</h1>

                <form onSubmit={handleSearch} className="mt-8 flex w-full md:w-1/2">
                    <input
                        type="text"
                        placeholder="Search for any IP address or domain"
                        value={ip}
                        onChange={(e) => setIp(e.target.value)}
                        className="h-12 px-6 rounded-l-xl w-full"
                    />
                    <button type="submit" className="bg-[#2b2b2b] h-12 px-6 rounded-r-xl">
                        <img src="/images/icon-arrow.svg" alt="search" />
                    </button>
                </form>
            </div>

            <div className="h-[65%] relative">
                <div className="absolute z-[9999] top-0 inset-x-6 md:mx-auto -translate-y-1/2 bg-white shadow flex flex-col md:flex-row items-center md:items-start p-6 md:px-0 text-center md:text-left justify-between rounded-xl md:w-3/4 space-y-2">
                    <div className="flex-1">
                        <p className="font-bold md:px-8">
                            <span className="uppercase text-[#969696] text-xs">IP Address</span>
                            <br />
                            <span className="text-xl">{location?.ip}</span>
                        </p>
                    </div>
                    <div className="flex-1">
                        <p className="font-bold md:border-l-2 md:px-8">
                            <span className="uppercase text-[#969696] text-xs">Location</span>
                            <br />
                            <span className="text-xl">{location ? `${location.city}, ${location.country}` : ''}</span>
                        </p>
                    </div>
                    <div className="flex-1">
                        <p className="font-bold md:border-l-2 md:px-8">
                            <span className="uppercase text-[#969696] text-xs">Timezone</span>
                            <br />
                            <span className="text-xl">{location && `UTC ${location.timezone_gmt}`}</span>
                        </p>
                    </div>
                    <div className="flex-1">
                        <p className="font-bold md:border-l-2 md:px-8">
                            <span className="uppercase text-[#969696] text-xs">ISP</span>
                            <br />
                            <span className="text-xl">{location?.isp}</span>
                        </p>
                    </div>
                </div>

                {loading || error ? (
                    <>
                        {loading && <p>Loading...</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </>
                ) : (
                    <>
                        {location && (
                            <MapView
                                lat={location.latitude}
                                lon={location.longitude}
                            />
                        )}
                    </>
                )}
            </div>
        </main>
    );
}

export default App
