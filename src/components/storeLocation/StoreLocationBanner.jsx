import PageBanner from "../common/PageBanner";

export default function StoreLocationBanner({ onNavigateHome }) {
  return (
    <PageBanner
      title="Store location"
      breadcrumb="STORE LOCATION"
      onNavigateHome={onNavigateHome}
    />
  );
}
