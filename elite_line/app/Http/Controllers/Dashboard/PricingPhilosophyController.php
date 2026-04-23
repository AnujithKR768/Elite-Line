<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PricingPhilosophy;
use App\Models\PricingPoint;
use Inertia\Inertia;

class PricingPhilosophyController extends Controller
{
    public function index()
    {
        $PricingPhilosophy = PricingPhilosophy::orderBy('id','asc') -> paginate(5);
        return Inertia::render('Home/pricingphilosophy/Index',[
            'PricingPhilosophy' => $PricingPhilosophy
        ]);
    }

    public function create()
    {
        return Inertia::render('Home/pricingphilosophy/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'footer' => 'required',
        ]);

        PricingPhilosophy::create([
            'title' => $request->title,
            'description' => $request->description,
            'footer' => $request->footer,
        ]);

        return redirect()->route('Pricing-Philosophy')->with('success', 'Pricing Philosophy created successfully.');
    }

    public function edit($id)
    {
        $PricingPhilosophy = PricingPhilosophy::findOrFail($id);
        return Inertia::render('Home/pricingphilosophy/Edit', [
            'PricingPhilosophy' => $PricingPhilosophy
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'footer' => 'required',
        ]);

        $PricingPhilosophy = PricingPhilosophy::findOrFail($id);
        $PricingPhilosophy->update([
            'title' => $request->title,
            'description' => $request->description,
            'footer' => $request->footer,
        ]);

        return redirect()->route('Pricing-Philosophy')->with('success', 'Pricing Philosophy updated successfully.');
    }

    public function destroy($id)
    {
        $PricingPhilosophy = PricingPhilosophy::findOrFail($id);
        $PricingPhilosophy->delete();

        return redirect()->route('Pricing-Philosophy')->with('success', 'Pricing Philosophy deleted successfully.');
    }

    public function PointIndex()
    {
        $PricingPoint = PricingPoint::orderBy('id','asc') ->paginate(5);
        return Inertia::render('Home/PricingPoint/Index',[
            'PricingPoint' => $PricingPoint
        ]);
    }

    public function PointCreate()
    {
        $philosophies = PricingPhilosophy::select('id', 'title')->get();

        return Inertia::render('Home/PricingPoint/Create', [
            'philosophies' => $philosophies
        ]);
    }

    public function PointStore(Request $request)
    {
    // Validation
    $request->validate([
        'pricing_philosophy_id' => 'required|exists:pricing_philosophies,id',
        'point' => 'required|string|max:255',
        'sort_order' => 'nullable|integer',
    ]);

    // Save
    PricingPoint::create([
        'pricing_philosophy_id' => $request->pricing_philosophy_id,
        'point' => $request->point,
        'sort_order' => $request->sort_order ?? 0,
    ]);

    // Redirect
    return redirect()
        ->route('Pricing-Point')
        ->with('success', 'Pricing Point created successfully.');

    }

    public function PointEdit($id)
    {
        // Get the point
        $point = PricingPoint::findOrFail($id);

        // Get all philosophies for dropdown
        $philosophies = PricingPhilosophy::select('id', 'title')->get();

        // Send data to React
        return Inertia::render('Home/PricingPoint/Edit', [
            'point' => $point,
            'philosophies' => $philosophies
        ]);
    }

    public function PointUpdate(Request $request, $id)
    {
        // Validation
        $request->validate([
            'pricing_philosophy_id' => 'required|exists:pricing_philosophies,id',
            'point' => 'required|string|max:255',
            'sort_order' => 'nullable|integer',
        ]);

        // Find record
        $point = PricingPoint::findOrFail($id);

        // Update data
        $point->update([
            'pricing_philosophy_id' => $request->pricing_philosophy_id,
            'point' => $request->point,
            'sort_order' => $request->sort_order ?? 0,
        ]);

        // Redirect
        return redirect()
            ->route('Pricing-Point')
            ->with('success', 'Pricing Point updated successfully.');
    }

    public function Pointdestroy($id)
    {
        // Find the point
        $point = PricingPoint::findOrFail($id);

        // Delete
        $point->delete();

        // Redirect
        return redirect()
            ->route('Pricing-Point')
            ->with('success', 'Pricing Point deleted successfully.');
    }
}
