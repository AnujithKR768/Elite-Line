<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\CorePrinciplePoint;
use App\Models\CorePrincipleSection;
use Illuminate\Http\Request;
use Inertia\Inertia;


class CorePrincipleController extends Controller
{
    public function index()
    {
        $principle = CorePrincipleSection::orderBy('id', 'asc') ->paginate(5);

        return Inertia::render('about/corePrinciple/Index',[
            'principle' => $principle
        ]);
    }

    public function create()
    {
        return Inertia::render('about/corePrinciple/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        CorePrincipleSection::create($data);
        return redirect()->route('core-principle.index')-> with('success', 'Core Principle created successfully');
    }

    public function edit($id)
    {
        $principle = CorePrincipleSection::findOrFail($id);

        return Inertia::render('about/corePrinciple/Edit', [
            'principle' => $principle
        ]);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $principle = CorePrincipleSection::findOrFail($id);
        $principle->update($data);

        return redirect()->route('core-principle.index') -> with('success', 'Updated successfully');
    }


    public function pointindex()
    {
        $points = CorePrinciplePoint::with('section')
         -> orderBy('id','asc')
         -> paginate(5);

        return Inertia::render('about/principlePoint/Index', [
            'points' => $points
        ]);
    }

    public function pointcreate()
    {
        $sections = CorePrincipleSection::all();

        return Inertia::render('about/principlePoint/Create', [
            'sections' => $sections
        ]);
    }

    public function pointstore(Request $request)
    {
        // Validate request
        $data = $request->validate([
            'section_id' => 'required|exists:core_principle_sections,id',
            'point' => 'required|string|max:255',
            'order' => 'nullable|integer',
        ]);

        // Optional: auto order if not provided
        if (!$request->order) {
            $lastOrder = CorePrinciplePoint::where('section_id', $request->section_id)
                ->max('order');

            $data['order'] = $lastOrder ? $lastOrder + 1 : 1;
        }

        // Store data
        CorePrinciplePoint::create($data);

        // Redirect with success message
        return redirect()
            ->route('point.index')
            ->with('success', 'Point created successfully');
    }

    public function pointedit($id)
    {
        $point = CorePrinciplePoint::findOrFail($id);
        $sections = CorePrincipleSection::all();

        return Inertia::render('about/principlePoint/Edit',[
            'point' => $point,
            'sections' => $sections,
        ]);
    }
   public function pointupdate(Request $request, $id)
    {
        $point = CorePrinciplePoint::findOrFail($id);

        $request->validate([
            'section_id' => 'required|exists:core_principle_sections,id',
            'point' => 'required|string|max:255',
            'order' => 'nullable|integer',
        ]);

        // Update fields
        $point->section_id = $request->section_id;
        $point->point = $request->point;
        $point->order = $request->order;

        $point->save();

        return redirect()->route('point.index')->with('success', 'Point updated successfully!');
    }

    public function pointdelete($id)
    {
        $point = CorePrinciplePoint::findOrFail($id);
        $point->delete();

        return redirect()->route('point.index')->with('success', 'Point deleted successfully');
    }
}
