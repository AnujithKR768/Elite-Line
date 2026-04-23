<?php

namespace App\Http\Controllers\View;

use App\Http\Controllers\Controller;
use App\Models\AutomationSystem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Header;
use App\Models\LearnMore;
use App\Models\Legacy;
use App\Models\Philosophy;
use App\Models\Card;
use App\Models\Banner;
use App\Models\PricingPhilosophy;
use App\Models\PricingPoint;
use App\Models\CompanyProfile;
use App\Models\MissionVision;
use App\Models\CorePrincipleSection;
use App\Models\CorePrinciplePoint;
use App\Models\EngineeringPoint;
use App\Models\EngineeringSection;
use App\Models\Industry;
use App\Models\Product;
use App\Models\LoadingSolution;
use App\Models\QualityStandard;
use App\Models\Service;
use App\Models\Contact;
use App\Models\Brand;

class HomeController extends Controller
{
    public function index()
    {
        $headers = Header::orderBy('id','asc')->get();
        $legacy = Legacy::orderBy('id','asc') -> get();
        $philosophy = Philosophy::orderBy('id','asc') -> get();
        $cards = Card::orderBy('id','asc') -> get();
        $whyChooseBanner = Banner::select('title', 'image')
        ->where('title', 'Why Industry Leaders Choose Us')
        ->first();

        $pricingPhilosophy = PricingPhilosophy::first();
        $pricingPoints = PricingPoint::orderBy('sort_order')->get();

        return Inertia::render('Home/Home', [
            'headers' => $headers,
            'legacy' => $legacy,
            'philosophy' => $philosophy,
            'cards' => $cards,
            'whyChooseBanner' => $whyChooseBanner,

            'pricingPhilosophy' => $pricingPhilosophy,
            'pricingPoints' => $pricingPoints,
        ]);

    }
    public function learnMore()
    {
        $learnmore = LearnMore::orderBy('id','asc')->get();

        return Inertia::render('Home/LearnMore/LearnMore',[
            'learnmore' => $learnmore
        ]);
    }

     // Know More
    public function knowmore(Request $request)
    {
        $philosophies = Philosophy::orderBy('id','asc')->get();

        return Inertia::render('Home/KnowMore/KnowMore', [
            'philosophies' => $philosophies,
            'tab' => $request->query('tab'),
        ]);
    }

    public function about()
    {
        $profile = CompanyProfile::orderBy('id','asc') -> get();
        $missionvision = MissionVision::orderBy('id', 'asc') -> get();

        $coreprinciple = CorePrincipleSection::orderBy('id', 'asc') -> get();
        $corepoint = CorePrinciplePoint::orderBy('order') -> get();

        $engineeringsection = EngineeringSection::orderBy('id', 'asc') ->get();
        $engineeringpoint = EngineeringPoint::orderBy('order') ->get();

        return Inertia::render('about/about', [
            'profile' => $profile,
            'missionvision' => $missionvision,
            'coreprinciple' => $coreprinciple,
            'corepoint' => $corepoint,
            'engineeringsection' => $engineeringsection,
            'engineeringpoint' => $engineeringpoint,
        ]);
    }

    public function solutions()
    {
        $products = Product::orderBy('id', 'asc') -> get();
        $solution = LoadingSolution::orderBy('id', 'asc') -> get();
        $automation = AutomationSystem::orderBy('id', 'asc') -> get();
        $quality = QualityStandard::orderBy('id', 'asc') -> get();

        return Inertia::render('solution/solution',[
            'products' => $products,
            'solution' => $solution,
            'automation' => $automation,
            'quality' => $quality        ]);
    }

    public function contact()
    {
        $services = Service::orderBy('id', 'asc') ->get();
        $industries = Industry::orderBy('id','asc') -> get();
        $contact = Contact::orderBy('id','asc') ->get();

        return Inertia::render('service_support/Service',[
            'services' => $services,
            'industries' => $industries,
            'contact' => $contact
        ]);
    }

    public function brands()
    {
        $brands = Brand::orderBy('id','asc') -> get();

        return Inertia::render('brands/Brands',[
            'brands' => $brands
        ]);
    }
}
