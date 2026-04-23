<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\EngineeringPoint;
use App\Models\EngineeringSection;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EngineeringController extends Controller
{
    public function index()
    {
        $engineering = EngineeringSection::orderBy('id', 'asc')->paginate(5);

        return Inertia::render('about/engineering/Index', [
            'engineering' => $engineering
        ]);
    }

    public function create()
    {
        return Inertia::render('about/engineering/Create');
    }

    public function store(Request $request)
    {
        // Validate
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Save
        EngineeringSection::create($data);

        // Correct route name
        return redirect()
            ->route('Engineering.index') // FIXED
            ->with('success', 'Engineering section created successfully');
    }

    public function edit($id)
    {
        $engineering = EngineeringSection::findOrFail($id);

        return Inertia::render('about/engineering/Edit',[
            'engineering' => $engineering
        ]);
    }

    public function update(Request $request, $id)
    {
        $engineering = EngineeringSection::findOrFail($id);

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $engineering->update($data);

        return redirect() -> route('Engineering.index') -> with('success', 'Engineering section updated successfully');
    }

    public function destroy($id)
    {
        $engineering = EngineeringSection::findOrFail($id);
        $engineering -> delete();

        return redirect()
            ->route('Engineering.index')
            ->with('success', 'Engineering section deleted successfully');
    }


// Engineering Points Methods

    public function pointindex()
    {
        $points = EngineeringPoint::orderBy('id', 'asc')->paginate(5);

        return Inertia::render('about/engineeringpoints/Index', [
            'points' => $points
        ]);
    }

    public function pointcreate()
    {
        $sections =EngineeringSection::all();

        return Inertia::render('about/engineeringpoints/Create', [
            'sections' => $sections
        ]);
    }

    public function pointstore(Request $request)
    {
        $data = $request->validate([
            'section_id' => 'required|exists:engineering_sections,id',
            'point' => 'required|string|max:255',
            'order' => 'nullable|integer',
        ]);

        EngineeringPoint::create($data);

        return redirect()->route('engineering-points.index')
            ->with('success', 'Engineering point created successfully');
    }

    public function pointedit($id)
    {
        $point =EngineeringPoint::findOrFail($id);
        $sections = EngineeringSection::all();

        return Inertia::render('about/engineeringpoints/Edit', [
            'point' => $point,
            'sections' => $sections

        ]);
    }

    public function pointupdate(Request $request, $id)
    {
        $point = EngineeringPoint::findOrFail($id);

        $data = $request->validate([
            'section_id' => 'required|exists:engineering_sections,id',
            'point' => 'required|string|max:255',
            'order' => 'nullable|integer',

        ]);
        $point -> update($data);
        return redirect()
            ->route('engineering-points.index')
            ->with('success', 'Engineering points updated successfully');
    }

    public function pointdelete($id)
    {
        $point = EngineeringPoint::findOrFail($id);
        $point -> delete();

        return redirect()
            ->route('engineering-points.index')
            ->with('success', 'Engineering point deleted successfully');
    }
}
