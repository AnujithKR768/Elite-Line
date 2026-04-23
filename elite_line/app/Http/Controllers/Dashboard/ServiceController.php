<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Industry;
use App\Models\Service;
use App\Models\Contact;
use Illuminate\Http\Request;
use App\Models\Quote;
use Inertia\Inertia;
use App\Models\Brand;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;
use App\Mail\QuoteRequestMail;

class ServiceController extends Controller
{
    public function serviceindex()
    {
        $services = Service::orderBy('id','asc') -> paginate(5);

        return Inertia::render('service_support/service/Index',[
            'services' => $services
        ]);
    }

    public function servicescreate()
    {
        return Inertia::render('service_support/service/Create');
    }

    public function servicesstore(Request $request)
    {
        // Validation
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
        ]);

        // Image Upload
        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('services', 'public');
        }

        // Store Data
        Service::create([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $imagePath,
        ]);

        // Redirect back
        return redirect()->route('service.index')->with('success', 'Service created successfully!');
    }

    public function serviceedit($id)
    {
        $service = Service::findOrFail($id);

        return Inertia::render('service_support/service/Edit', [
            'service' => $service,
        ]);
    }

    public function serviceupdate(Request $request, $id)
    {
        // Find service
        $service = Service::findOrFail($id);

        // Validation
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
        ]);

        // Update basic fields
        $service->title = $request->title;
        $service->description = $request->description;

        // Check if new image uploaded
        if ($request->hasFile('image')) {

            // Delete old image (only if exists)
            if ($service->image && Storage::exists('public/' . $service->image)) {
                Storage::delete('public/' . $service->image);
            }

            // Store new image
            $path = $request->file('image')->store('services', 'public');

            // Save new image path
            $service->image = $path;
        }

        // Save changes
        $service->save();

        // Redirect back
        return redirect()
            ->route('service.index')
            ->with('success', 'Service updated successfully!');
    }

    public function servicedestroy($id)
    {
        $service = Service::findOrFail($id);

        // Delete image if exists
        if ($service->image && Storage::exists('public/' . $service->image)) {
            Storage::delete('public/' . $service->image);
        }

        // Delete service
        $service->delete();

        return redirect()->route('service.index')->with('success', 'Service deleted successfully!');
    }



    // Industry


    public function industryindex()
    {
        $industries = Industry::orderBy('id' , 'asc') -> paginate(5);

        return Inertia::render('service_support/Industry/Index',[
            'industries' => $industries
        ]);
    }
    public function industrycreate()
    {
        return Inertia::render('service_support/Industry/Create');
    }

    public function industrystore(Request $request)
    {
         $request->validate([
        's_no'   => 'required|integer',
        'title'  => 'required|string|max:255',
        'points' => 'required|array',
        'points.*' => 'required|string',
    ]);

    Industry::create([
        's_no'   => $request->s_no,
        'title'  => $request->title,
        'points' => json_encode($request->points),
    ]);

    return redirect()->route('industry.index') -> with('success', 'Service created successfully!');
    }

    public function industryedit($id)
    {
        $industry = Industry::findOrFail($id);

        return Inertia::render('service_support/Industry/Edit', [
            'industry' => $industry,
        ]);
    }

    public function industryupdate(Request $request, $id)
    {
        $industry = Industry::findOrFail($id);

        $request->validate([
            's_no'   => 'required|integer',
            'title'  => 'required|string|max:255',
            'points' => 'required|array',
            'points.*' => 'required|string',
        ]);

        $industry->s_no = $request->s_no;
        $industry->title = $request->title;
        $industry->points = json_encode($request->points);
        $industry->save();

        return redirect()->route('industry.index')->with('success', 'Industry updated successfully!');
    }

    public function industrydestroy($id)
    {
        $industry = Industry::findOrFail($id);
        $industry->delete();

        return redirect()->route('industry.index')->with('success', 'Industry deleted successfully!');
    }


    // Contact Support

    public function contactindex()
    {
        $contact = Contact::orderBy('id','asc') -> paginate(5);

        return Inertia::render('solution/contact/Index',[
            'contact' => $contact
        ]);
    }

    public function contactcreate()
    {
        return Inertia::render('solution/contact/Create');
    }

    public function contactstore(Request $request)
    {
        // Validation
        $request->validate([
            'company_name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email',
            'email_secondary' => 'nullable|email',
            'website' => 'nullable|string',
            'map_embed' => 'nullable|string',
        ]);

        // Store
        Contact::create([
            'company_name' => $request->company_name,
            'office' => $request->office,
            'address' => $request->address,
            'phone' => $request->phone,
            'email' => $request->email,
            'email_secondary' => $request->email_secondary,
            'website' => $request->website,
            'map_embed' => $request->map_embed,
        ]);

        // Redirect
        return redirect() -> route('contact.index') -> with('success', 'Contact created successfully');
    }


    public function contactedit($id)
    {
        $contact = Contact::findOrFail($id);

        return Inertia::render('solution/contact/Edit', [
            'contact' => $contact,
        ]);
    }

    public function contactupdate(Request $request, $id)
    {
        $contact = Contact::findOrFail($id);

        // Validation
        $request->validate([
            'company_name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email',
            'email_secondary' => 'nullable|email',
            'website' => 'nullable|string',
            'map_embed' => 'nullable|string',
        ]);

        // Update
        $contact->company_name = $request->company_name;
        $contact->office = $request->office;
        $contact->address = $request->address;
        $contact->phone = $request->phone;
        $contact->email = $request->email;
        $contact->email_secondary = $request->email_secondary;
        $contact->website = $request->website;
        $contact->map_embed = $request->map_embed;
        $contact->save();

        // Redirect
        return redirect() -> route('contact.index') -> with('success', 'Contact updated successfully');
    }

     public function contactdestroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return redirect()->route('contact.index')->with('success', 'Contact deleted successfully!');
    }


    // Quote Request

    public function quote()
    {
        return Inertia::render('quote/Quote');
    }

    public function quotestore(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required',
            'project_details' => 'required',
        ]);

        // Save all fields
        $quote = Quote::create([
            'name' => $request->name,
            'company' => $request->company,
            'email' => $request->email,
            'phone' => $request->phone,
            'location' => $request->location,
            'service_type' => $request->service_type,
            'product_type' => $request->product_type,
            'urgency' => $request->urgency,
            'project_details' => $request->project_details,
            'status' => 'new',
        ]);

        // Send email to admin
    //NOW $quote EXISTS
    Mail::to('info@eliteautomaticdoors.com')
        ->send(new QuoteRequestMail($quote));

        // Return success for Inertia
        return redirect()->route('home')->with('success', 'Quote request submitted successfully!');
    }
    public function quoteindex()
    {
        $quotes = Quote::orderBy('id','asc') -> paginate(5);

        return Inertia::render('quote/Index',[
            'quotes' => $quotes
        ]);
    }

    public function quoteStatusUpdate(Request $request, Quote $quote)
    {
        $request->validate([
            'status' => 'required|string'
        ]);

        $quote->update([
            'status' => $request->status
        ]);

        return back();
    }

    public function quoteDestroy(Quote $quote)
    {
        $quote->delete();

        return redirect() -> route('quote.index') -> with('success', 'Quote deleted successfully!');
    }

    // Brands

    public function brandindex()
    {
        $brands = Brand::orderBy('id','asc') -> paginate(10);
        return Inertia::render('brands/Index',[
            'brands' => $brands
        ]);
    }

    public function brandcreate()
    {
        return Inertia::render('brands/Create');
    }

    public function brandstore(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'logo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
        ]);

        $logoPath = null;

        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('brands', 'public');
        }

        Brand::create([
            'title' => $request->title,
            'logo' => $logoPath,
        ]);

        return redirect()->route('brand.index')->with('success', 'Brand created successfully!');
    }

     public function brandedit($id)
    {
        $brand = Brand::findOrFail($id);

        return Inertia::render('brands/Edit', [
            'brand' => $brand,
        ]);
    }

     public function brandupdate(Request $request, $id)
    {
        $brand = Brand::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'logo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
        ]);

        $brand->title = $request->title;

        if ($request->hasFile('logo')) {
            if ($brand->logo && Storage::exists('public/' . $brand->logo)) {
                Storage::delete('public/' . $brand->logo);
            }

            $path = $request->file('logo')->store('brands', 'public');
            $brand->logo = $path;
        }

        $brand->save();

        return redirect()->route('brand.index')->with('success', 'Brand updated successfully!');
    }

     public function branddestroy($id)
    {
        $brand = Brand::findOrFail($id);

        if ($brand->logo && Storage::exists('public/' . $brand->logo)) {
            Storage::delete('public/' . $brand->logo);
        }

        $brand->delete();

        return redirect()->route('brand.index')->with('success', 'Brand deleted successfully!');
    }
}
